// POST /api/lead  { name, email, phone?, company?, website?, auditType?, currentSpend?, goals?, notes?, source? }
// Saves the lead to Neon and sends the email alert from site settings. Returns { success, leadId, leadNumber }.
import { getDb, readBody, sendJson } from "./_lib/db.js";
import { saveLead } from "./_lib/lead-core.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });
  try {
    const r = await saveLead(getDb(), readBody(req), { resendKey: process.env.RESEND_API_KEY });
    return sendJson(res, r.status, r.body);
  } catch (e) {
    console.warn("api/lead:", String(e));
    return sendJson(res, 500, { error: "Your request couldn't be saved. Please try again or email us." });
  }
}
