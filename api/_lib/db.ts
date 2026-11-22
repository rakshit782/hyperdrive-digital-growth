// Neon connection for Vercel functions (files under api/_lib are not exposed as routes).
import { neon } from "@neondatabase/serverless";

export interface Db {
  /** Run one parameterised statement and return its rows. */
  q<T = Record<string, any>>(text: string, params?: unknown[]): Promise<T[]>;
}

const ISO = (v: string) => {
  const d = new Date(v.replace(" ", "T").replace(/([+-]\d\d)$/, "$1:00"));
  return isNaN(d.getTime()) ? v : d.toISOString();
};

/** Postgres array literal like {a,b} -> ["a","b"] (enough for uuid[]/text[] without quotes or nesting). */
const arr = (v: string) => (v === "{}" ? [] : v.slice(1, -1).split(",").map((x) => x.replace(/^"|"$/g, "")));

// Return JSON-friendly values: dates as YYYY-MM-DD, timestamps as ISO strings, numerics as numbers.
const PARSERS: Record<number, (v: string) => unknown> = {
  16: (v) => v === "t",
  20: Number, 21: Number, 23: Number, 700: Number, 701: Number, 1700: Number,
  114: (v) => JSON.parse(v), 3802: (v) => JSON.parse(v),
  1082: (v) => v,
  1114: ISO, 1184: ISO,
  1009: arr, 1015: arr, 2951: arr,
};

let cached: Db | null = null;

export function getDb(): Db {
  if (cached) return cached;
  // Accepts the server-only name or the VITE_ name the frontend already uses in Vercel.
  const url = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.VITE_NEON_DATABASE_URL;
  if (!url) throw new Error("No Neon connection string found (NEON_DATABASE_URL or VITE_NEON_DATABASE_URL) in the Vercel project.");
  const sql = neon(url, {
    types: { getTypeParser: (oid: number) => PARSERS[oid] || ((v: string) => v) } as any,
  });
  cached = { q: (text, params = []) => sql.query(text, params as any[]) as any };
  return cached;
}

export function sendJson(res: any, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json");
  if (!res.getHeader?.("Cache-Control")) res.setHeader("Cache-Control", "no-store");
  res.send(JSON.stringify(body));
}

export function readBody(req: any): Record<string, any> {
  const b = req.body;
  if (!b) return {};
  if (typeof b === "string") { try { return JSON.parse(b); } catch { return {}; } }
  return b;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

/** Verify an HS256 JWT issued by the dashboard login (same JWT_SECRET) and return its payload. */
export async function verifyJwt(token: string, secret: string): Promise<Record<string, any>> {
  const [h, p, s] = token.split(".");
  if (!h || !p || !s) throw new Error("malformed");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const sig = Uint8Array.from(Buffer.from(s, "base64url"));
  const ok = await crypto.subtle.verify("HMAC", key, sig, new TextEncoder().encode(`${h}.${p}`));
  if (!ok) throw new Error("bad signature");
  const header = JSON.parse(Buffer.from(h, "base64url").toString());
  if (header.alg !== "HS256") throw new Error("bad alg");
  const payload = JSON.parse(Buffer.from(p, "base64url").toString());
  if (payload.exp && payload.exp * 1000 < Date.now()) throw new Error("expired");
  return payload;
}

/** Returns the admin's user id, or throws 401/403. */
export async function requireAdmin(db: Db, token: string, secret: string | undefined): Promise<string> {
  if (!secret) throw new HttpError(500, "JWT_SECRET is not set in the Vercel project.");
  if (!token) throw new HttpError(401, "Sign in as an admin to continue.");
  let sub: string;
  try {
    const payload = await verifyJwt(token, secret);
    if (payload.type === "refresh") throw new Error("refresh token used as access token");
    sub = String(payload.sub ?? "");
  } catch {
    throw new HttpError(401, "Your session has expired. Sign in again.");
  }
  const rows = await db.q<{ role: string | null }>(
    "SELECT ur.role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE u.id = $1", [sub]);
  if (rows[0]?.role !== "admin") throw new HttpError(403, "Admin access required.");
  return sub;
}
