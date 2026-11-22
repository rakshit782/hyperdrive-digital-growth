// POST /api/meta-capi  { lead_id, event_id, event_source_url, fbp, fbc, external_id }
// Inactive (returns "skipped") until META_CAPI_TOKEN is set in Vercel.
import { getDb, readBody, sendJson } from "./_lib/db.js";
import { sendLeadToMeta } from "./_lib/meta-capi-core.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });
  try {
    const ip = String(req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "").split(",")[0].trim();
    const r = await sendLeadToMeta(getDb(), readBody(req), { ip, userAgent: String(req.headers["user-agent"] || "") }, {
      token: process.env.META_CAPI_TOKEN,
      pixelId: process.env.META_PIXEL_ID,
      testEventCode: process.env.META_TEST_EVENT_CODE,
    });
    return sendJson(res, r.status, r.body);
  } catch (e) {
    console.warn("api/meta-capi:", String(e));
    return sendJson(res, 500, { error: "Couldn't send the event." });
  }
}
