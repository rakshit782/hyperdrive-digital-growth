// POST /api/auth/login | /api/auth/refresh ; GET or POST /api/auth/verify (Authorization: Bearer <token>)
import { getDb, readBody, sendJson } from "../_lib/db.js";
import { authAction } from "../_lib/auth-core.js";

export default async function handler(req: any, res: any) {
  const action = String(req.query?.action ?? "");
  if (req.method !== "POST" && !(req.method === "GET" && action === "verify")) return sendJson(res, 405, { error: "Use POST." });
  const auth = String(req.headers.authorization ?? "");
  try {
    const r = await authAction(getDb(), action, readBody(req), auth.startsWith("Bearer ") ? auth.slice(7) : "", process.env.JWT_SECRET);
    return sendJson(res, r.status, r.body);
  } catch (e) {
    console.warn("api/auth:", String(e));
    return sendJson(res, 500, { error: "Sign-in is temporarily unavailable. Try again in a moment." });
  }
}
