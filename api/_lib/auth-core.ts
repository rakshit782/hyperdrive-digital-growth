// Dashboard sign-up / sign-in / token check / refresh. Port of the former Supabase functions
// neon-auth-*: same password hashing, same HS256 tokens (JWT_SECRET) and the same response shapes.
import { createHmac } from "node:crypto";
import { verifyJwt, type Db } from "./db.js";
import { hashPassword, isLegacyHash, verifyPassword } from "./passwords.js";

const ACCESS_TTL = 60 * 60;            // 1 hour
const REFRESH_TTL = 60 * 60 * 24 * 30; // 30 days
type R = { status: number; body: Record<string, unknown> };

export function signJwt(payload: Record<string, unknown>, secret: string): string {
  const enc = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const head = enc({ alg: "HS256", typ: "JWT" });
  const body = enc(payload);
  const sig = createHmac("sha256", secret).update(`${head}.${body}`).digest("base64url");
  return `${head}.${body}.${sig}`;
}

function tokens(userId: string, email: string, secret: string) {
  const iat = Math.floor(Date.now() / 1000);
  return {
    accessToken: signJwt({ sub: userId, email, exp: iat + ACCESS_TTL, iat }, secret),
    refreshToken: signJwt({ sub: userId, email, type: "refresh", exp: iat + REFRESH_TTL, iat }, secret),
  };
}


export async function authAction(db: Db, action: string, body: Record<string, any>, bearer: string, secret?: string): Promise<R> {
  if (!secret) return { status: 500, body: { error: "JWT_SECRET is not set in the Vercel project." } };

  if (action === "login") {
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");
    if (!email || !password) return { status: 400, body: { error: "Email and password are required" } };
    const rows = await db.q<{ id: string; email: string; password_hash: string; full_name: string | null }>(
      "SELECT id, email, password_hash, full_name FROM users WHERE lower(email) = lower($1) LIMIT 1", [email]);
    const user = rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) return { status: 401, body: { error: "Invalid credentials" } };
    // Upgrade old unsalted SHA-256 hashes to scrypt now that we have the plain password.
    if (isLegacyHash(user.password_hash)) {
      await db.q("UPDATE users SET password_hash = $2, updated_at = now() WHERE id = $1", [user.id, await hashPassword(password)]);
    }
    const role = (await db.q<{ role: string }>("SELECT role FROM user_roles WHERE user_id = $1", [user.id]))[0]?.role || "user";
    return { status: 200, body: { success: true, user: { id: user.id, email: user.email, full_name: user.full_name, role }, ...tokens(user.id, user.email, secret) } };
  }

  // No self-signup: admins add dashboard users from Team & Users (api/crm users.create).
  if (action === "signup") return { status: 403, body: { error: "Sign-up is closed. Ask an admin to add you." } };

  if (action === "verify") {
    if (!bearer) return { status: 401, body: { error: "Missing or invalid authorization header" } };
    let sub: string;
    try {
      const p = await verifyJwt(bearer, secret);
      if (p.type === "refresh") throw new Error("refresh token");
      sub = String(p.sub);
    } catch {
      return { status: 401, body: { error: "Invalid or expired token" } };
    }
    const user = (await db.q(
      "SELECT u.id, u.email, u.full_name, ur.role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE u.id = $1", [sub]))[0];
    if (!user) return { status: 404, body: { error: "User not found" } };
    return { status: 200, body: { success: true, user } };
  }

  if (action === "refresh") {
    const rt = String(body.refreshToken ?? "");
    if (!rt) return { status: 400, body: { error: "Refresh token is required" } };
    try {
      const p = await verifyJwt(rt, secret);
      if (p.type !== "refresh") return { status: 401, body: { error: "Invalid refresh token" } };
      // A deleted user's refresh token must stop working.
      if (!(await db.q("SELECT 1 FROM users WHERE id = $1", [String(p.sub ?? "")])).length) {
        return { status: 401, body: { error: "Invalid or expired refresh token" } };
      }
      const iat = Math.floor(Date.now() / 1000);
      return { status: 200, body: { success: true, accessToken: signJwt({ sub: p.sub, email: p.email, exp: iat + ACCESS_TTL, iat }, secret) } };
    } catch {
      return { status: 401, body: { error: "Invalid or expired refresh token" } };
    }
  }

  return { status: 400, body: { error: "Unknown action." } };
}
