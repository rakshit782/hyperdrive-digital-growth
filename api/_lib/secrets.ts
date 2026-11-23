// Resend key storage, compatible with the existing site_settings values
// ("enc:v1:<iv hex>:<ciphertext+tag hex>", AES-256-GCM, key = SHA-256 of a fixed phrase).
// Now that this runs on the server, the key never reaches the browser.
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

const PREFIX = "enc:v1:";
const KEY = () => createHash("sha256").update("amz_secure_credentials_v1_site_settings_vault").digest();

export function decryptSecret(v: string | null | undefined): string | null {
  if (!v) return null;
  if (!v.startsWith(PREFIX)) return v;
  try {
    const [ivHex, dataHex] = v.slice(PREFIX.length).split(":");
    const data = Buffer.from(dataHex, "hex");
    const d = createDecipheriv("aes-256-gcm", KEY(), Buffer.from(ivHex, "hex"));
    d.setAuthTag(data.subarray(data.length - 16));
    return Buffer.concat([d.update(data.subarray(0, data.length - 16)), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}

export function encryptSecret(plain: string): string {
  if (!plain || plain.startsWith(PREFIX)) return plain;
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", KEY(), iv);
  const out = Buffer.concat([c.update(plain, "utf8"), c.final(), c.getAuthTag()]);
  return `${PREFIX}${iv.toString("hex")}:${out.toString("hex")}`;
}

export const maskKey = (k: string | null) => (k && k.length > 8 ? `${k.slice(0, 5)}...${k.slice(-4)}` : k);

export const escapeHtml = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/** Sender for all emails. Resend's test sender (onboarding@resend.dev) only delivers to the Resend
 *  account owner's address, so set RESEND_FROM in Vercel to an address on a domain verified in Resend,
 *  e.g. "AMZ Ad Scout Leads <leads@amzadscout.com>". */
export const resendFrom = () => (process.env.RESEND_FROM || "").trim() || "AMZ Leads <onboarding@resend.dev>";

export async function sendResend(key: string, to: string[], subject: string, html: string, doFetch: typeof fetch = fetch) {
  const res = await doFetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: resendFrom(), to, subject, html }),
  });
  if (!res.ok) {
    const d: any = await res.json().catch(() => ({}));
    throw new Error(d.message || d.error || `Resend error (${res.status})`);
  }
}
