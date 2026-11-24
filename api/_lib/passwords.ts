// Password hashing for dashboard users (public.users.password_hash).
// New hashes: "scrypt$<salt hex>$<key hex>" (salted, slow). Older accounts still have an unsalted
// SHA-256 hex hash; those keep working and are upgraded to scrypt the next time the user signs in.
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const KEYLEN = 64;
const derive = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => scrypt(password, salt, KEYLEN, (err, key) => (err ? reject(err) : resolve(key))));

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString("hex")}$${(await derive(password, salt)).toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string | null | undefined): Promise<boolean> {
  if (!stored) return false;
  if (stored.startsWith("scrypt$")) {
    const [, saltHex, keyHex] = stored.split("$");
    if (!saltHex || !keyHex) return false;
    const expected = Buffer.from(keyHex, "hex");
    const actual = await derive(password, Buffer.from(saltHex, "hex"));
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
  // Legacy unsalted SHA-256 hex.
  const legacy = Buffer.from(createHash("sha256").update(password).digest("hex"));
  const given = Buffer.from(stored);
  return legacy.length === given.length && timingSafeEqual(legacy, given);
}

export const isLegacyHash = (stored: string | null | undefined) => !!stored && !stored.startsWith("scrypt$");
