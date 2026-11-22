// POST /api/admin  { action, ...payload }  with header x-admin-token: <dashboard access token>
import { getDb, readBody, sendJson } from "./_lib/db.js";
import { handleAdmin } from "./_lib/admin-core.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });
  const body = readBody(req);
  try {
    const r = await handleAdmin(getDb(), { action: String(body.action ?? ""), body, token: String(req.headers["x-admin-token"] ?? ""), jwtSecret: process.env.JWT_SECRET });
    return sendJson(res, r.status, r.body);
  } catch (e) {
    console.warn("api/admin:", String(e));
    return sendJson(res, 500, { error: "The admin service isn't configured. Check NEON_DATABASE_URL and JWT_SECRET in Vercel." });
  }
}
