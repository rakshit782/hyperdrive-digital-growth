// POST /api/public  { action, ...payload }  — no sign-in. Only returns public data.
import { getDb, readBody, sendJson } from "./_lib/db.js";
import { handlePublic } from "./_lib/public-core.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });
  const body = readBody(req);
  try {
    const ip = String(req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "").split(",")[0].trim();
    const r = await handlePublic(getDb(), String(body.action ?? ""), body, { ip, userAgent: String(req.headers["user-agent"] || "") });
    if (r.status === 200 && body.action === "settings.get") res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return sendJson(res, r.status, r.body);
  } catch (e) {
    console.warn("api/public:", String(e));
    return sendJson(res, 500, { error: "Service unavailable. Try again in a moment." });
  }
}
