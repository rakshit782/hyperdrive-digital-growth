// Web Crypto AES-GCM encryption/decryption utility for sensitive credentials (e.g., API keys)

const ENCRYPTION_PREFIX = "enc:v1:";

// Secure derivation key seed for AMZ site settings
const DERIVATION_SALT = "amz_secure_credentials_v1";

async function getEncryptionKey(): Promise<CryptoKey> {
  const secretString = `${DERIVATION_SALT}_site_settings_vault`;
  const enc = new TextEncoder();
  const rawKey = await crypto.subtle.digest("SHA-256", enc.encode(secretString));
  return crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt a plaintext string using AES-GCM.
 * If the value is already encrypted (starts with 'enc:v1:'), it is returned as-is.
 */
export async function encryptSecret(plainText: string): Promise<string> {
  if (!plainText) return plainText;
  if (plainText.startsWith(ENCRYPTION_PREFIX)) {
    return plainText;
  }

  const key = await getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plainText);

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  const ivHex = Array.from(iv).map((b) => b.toString(16).padStart(2, "0")).join("");
  const cipherHex = Array.from(new Uint8Array(cipherBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${ENCRYPTION_PREFIX}${ivHex}:${cipherHex}`;
}

/**
 * Decrypt an AES-GCM encrypted string.
 * If the string does not have the 'enc:v1:' prefix, it is treated as legacy unencrypted text and returned as-is.
 */
export async function decryptSecret(encryptedOrPlainText: string): Promise<string> {
  if (!encryptedOrPlainText) return encryptedOrPlainText;
  if (!encryptedOrPlainText.startsWith(ENCRYPTION_PREFIX)) {
    return encryptedOrPlainText;
  }

  try {
    const parts = encryptedOrPlainText.slice(ENCRYPTION_PREFIX.length).split(":");
    if (parts.length !== 2) {
      return encryptedOrPlainText;
    }

    const [ivHex, cipherHex] = parts;
    const iv = new Uint8Array(
      ivHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
    const cipherBytes = new Uint8Array(
      cipherHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    const key = await getEncryptionKey();
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipherBytes
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.warn("Failed to decrypt secret, returning original:", err);
    return encryptedOrPlainText;
  }
}
