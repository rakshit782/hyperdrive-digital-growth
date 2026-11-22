// Public (no sign-in) actions used by every visitor: site settings (public fields only), visitor and
// security logging, certificate verification and newsletter sign-up.
import { HttpError, type Db } from "./db.js";
import { getSettings } from "./settings-core.js";
import { verifyCertificate } from "./certificates-core.js";

const clip = (v: unknown, n: number) => (v == null || v === "" ? null : String(v).slice(0, n));

export async function handlePublic(db: Db, action: string, body: Record<string, any>, ctx: { ip?: string; userAgent?: string }) {
  try {
    switch (action) {
      case "settings.get":
        return { status: 200, body: await getSettings(db, false) };

      case "visitor.track":
        await db.q(`INSERT INTO public.visitor_logs (ip_address, user_agent, page_url, referrer, created_at) VALUES ($1, $2, $3, $4, now())`,
          [clip(ctx.ip || "unknown", 100), clip(ctx.userAgent, 500), clip(body.page_url, 1000), clip(body.referrer, 1000)]);
        return { status: 200, body: { success: true } };

      case "security.log":
        await db.q(`INSERT INTO public.security_logs (form_type, ip_address, user_agent, recaptcha_score, honeypot_triggered, csrf_valid, submission_data, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, now())`,
          [clip(body.form_type, 80), clip(ctx.ip || "unknown", 100), clip(ctx.userAgent, 500),
           Number.isFinite(Number(body.recaptcha_score)) ? Number(body.recaptcha_score) : null,
           Boolean(body.honeypot_triggered), body.csrf_valid !== false,
           body.submission_data ? JSON.stringify(body.submission_data).slice(0, 5000) : null]);
        return { status: 200, body: { success: true } };

      case "certificate.verify":
        return { status: 200, body: await verifyCertificate(db, body.certificate_id) };

      case "newsletter.subscribe": {
        const email = String(body.email ?? "").trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
        await db.q(`INSERT INTO public.newsletter_emails (email, name, status, source, created_at, updated_at)
                    VALUES ($1, $2, 'subscribed', $3, now(), now())
                    ON CONFLICT (email) DO UPDATE SET status = 'subscribed', updated_at = now()`,
          [email, clip(body.name, 200), clip(body.source, 80) || "website"]);
        return { status: 200, body: { success: true } };
      }
    }
    return { status: 400, body: { error: `Unknown action "${action}".` } };
  } catch (e) {
    if (e instanceof HttpError) return { status: e.status, body: { error: e.message } };
    console.warn("public error:", String(e));
    return { status: 500, body: { error: "Something went wrong on the server. Try again." } };
  }
}
