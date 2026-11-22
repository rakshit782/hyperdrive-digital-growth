// GET /api/health — is the live site's database connection working, and is it configured?
// Public, so it reveals no host, user, password, connection string or data — only yes/no checks
// and the database error type when the connection fails (e.g. "password authentication failed").
import { getDb, sendJson } from "./_lib/db.js";

function errorType(e: unknown): string {
  const m = String((e as any)?.message || e).toLowerCase();
  if (m.includes("not set")) return "NEON_DATABASE_URL is not set in Vercel";
  if (m.includes("password authentication failed")) return "password authentication failed (the connection string has an old or wrong password)";
  if (m.includes("does not exist")) return "database or table does not exist";
  if (m.includes("enotfound") || m.includes("getaddrinfo")) return "database host not found (check the connection string)";
  if (m.includes("timeout") || m.includes("timed out")) return "connection timed out";
  return "connection failed";
}

export default async function handler(_req: any, res: any) {
  const out: Record<string, unknown> = {
    neon_database_url_set: Boolean(process.env.NEON_DATABASE_URL),
    jwt_secret_set: Boolean(process.env.JWT_SECRET),
    meta_capi_token_set: Boolean(process.env.META_CAPI_TOKEN),
    deployment_commit: (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7) || null,
  };
  try {
    await getDb().q("SELECT 1 FROM public.leads LIMIT 1");
    out.database_connected = true;
  } catch (e) {
    out.database_connected = false;
    out.database_error = errorType(e);
  }
  return sendJson(res, 200, out);
}
