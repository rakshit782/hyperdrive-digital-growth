import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

const MAX_REVIEW_COUNT = 2147483647;
const MAX_REVIEW_URL_LENGTH = 500;

interface SettingsRow {
  rating_value: string | number;
  review_count: string | number;
  review_source_url: string | null;
  rating_visible: boolean;
  resend_api_key?: string | null;
  notification_email?: string | null;
  email_notifications_enabled?: boolean;
  email_subject_template?: string | null;
  email_html_template?: string | null;
  updated_at: Date | string;
}

interface SettingsInput {
  rating_value: number;
  review_count: number;
  review_source_url: string | null;
  rating_visible: boolean;
  resend_api_key?: string | null;
  notification_email?: string | null;
  email_notifications_enabled?: boolean;
  email_subject_template?: string | null;
  email_html_template?: string | null;
}

const SELECT_SQL = `
  SELECT 
    rating_value, 
    review_count, 
    review_source_url, 
    rating_visible, 
    resend_api_key, 
    notification_email, 
    email_notifications_enabled, 
    email_subject_template,
    email_html_template,
    updated_at
  FROM amz_app.site_settings
  WHERE id = 1
`;

const UPSERT_SQL = `
  INSERT INTO amz_app.site_settings (
    id, rating_value, review_count, review_source_url, rating_visible,
    resend_api_key, notification_email, email_notifications_enabled,
    email_subject_template, email_html_template, updated_at
  )
  VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, now())
  ON CONFLICT (id) DO UPDATE SET
    rating_value = EXCLUDED.rating_value,
    review_count = EXCLUDED.review_count,
    review_source_url = EXCLUDED.review_source_url,
    rating_visible = EXCLUDED.rating_visible,
    resend_api_key = EXCLUDED.resend_api_key,
    notification_email = EXCLUDED.notification_email,
    email_notifications_enabled = EXCLUDED.email_notifications_enabled,
    email_subject_template = EXCLUDED.email_subject_template,
    email_html_template = EXCLUDED.email_html_template,
    updated_at = now()
  RETURNING 
    rating_value, 
    review_count, 
    review_source_url, 
    rating_visible, 
    resend_api_key, 
    notification_email, 
    email_notifications_enabled, 
    email_subject_template,
    email_html_template,
    updated_at
`;

function json(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

async function ensureSchema(client: Client) {
  try {
    await client.queryArray(`
      CREATE SCHEMA IF NOT EXISTS amz_app;
      CREATE TABLE IF NOT EXISTS amz_app.site_settings (
        id INT PRIMARY KEY DEFAULT 1,
        rating_value NUMERIC(2,1) DEFAULT 0,
        review_count INT DEFAULT 0,
        review_source_url TEXT,
        rating_visible BOOLEAN DEFAULT false,
        resend_api_key TEXT,
        notification_email TEXT,
        email_notifications_enabled BOOLEAN DEFAULT false,
        email_subject_template TEXT,
        email_html_template TEXT,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
      ALTER TABLE amz_app.site_settings ADD COLUMN IF NOT EXISTS resend_api_key TEXT;
      ALTER TABLE amz_app.site_settings ADD COLUMN IF NOT EXISTS notification_email TEXT;
      ALTER TABLE amz_app.site_settings ADD COLUMN IF NOT EXISTS email_notifications_enabled BOOLEAN DEFAULT false;
      ALTER TABLE amz_app.site_settings ADD COLUMN IF NOT EXISTS email_subject_template TEXT;
      ALTER TABLE amz_app.site_settings ADD COLUMN IF NOT EXISTS email_html_template TEXT;
    `);
  } catch (e) {
    console.warn("ensureSchema migration warning:", String(e));
  }
}

function missingRow() {
  return {
    rating_value: 0,
    review_count: 0,
    review_source_url: null,
    rating_visible: false,
    resend_api_key: null,
    notification_email: null,
    email_notifications_enabled: false,
    email_subject_template: null,
    email_html_template: null,
    updated_at: null,
  };
}

function toIsoTimestamp(value: Date | string): string {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toISOString();
}

function shape(row: SettingsRow, maskKey = true) {
  let displayKey = row.resend_api_key ?? null;
  if (maskKey && displayKey && displayKey.length > 8) {
    displayKey = `${displayKey.slice(0, 5)}...${displayKey.slice(-4)}`;
  }
  return {
    rating_value: Number(row.rating_value),
    review_count: Number(row.review_count),
    review_source_url: row.review_source_url,
    rating_visible: row.rating_visible === true,
    resend_api_key: displayKey,
    has_resend_api_key: Boolean(row.resend_api_key && row.resend_api_key.trim().length > 0),
    notification_email: row.notification_email ?? null,
    email_notifications_enabled: row.email_notifications_enabled === true,
    email_subject_template: row.email_subject_template ?? null,
    email_html_template: row.email_html_template ?? null,
    updated_at: toIsoTimestamp(row.updated_at),
  };
}

function parseSettings(
  body: unknown,
): { ok: true; value: SettingsInput } | { ok: false; error: string } {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Request body must be a JSON object" };
  }

  const record = body as Record<string, unknown>;
  let rating_value = 0;
  if (record.rating_value !== undefined && record.rating_value !== null) {
    const rating = typeof record.rating_value === "number" ? record.rating_value : Number(record.rating_value);
    if (Number.isFinite(rating) && rating >= 0 && rating <= 5) {
      rating_value = Number(rating.toFixed(1));
    }
  }

  let reviewCount = 0;
  if (record.review_count !== undefined && record.review_count !== null) {
    const count = typeof record.review_count === "number" ? record.review_count : Number(record.review_count);
    if (!Number.isInteger(count) || count < 0 || count > MAX_REVIEW_COUNT) {
      return { ok: false, error: "review_count must be an integer greater than or equal to 0" };
    }
    reviewCount = count;
  }

  const source = record.review_source_url;
  let review_source_url: string | null = null;
  if (source !== null && source !== undefined && source !== "") {
    if (typeof source !== "string") {
      return {
        ok: false,
        error: "review_source_url must be null, empty, or an https URL of at most 500 characters",
      };
    }
    const trimmed = source.trim();
    if (trimmed !== "") {
      if (!trimmed.startsWith("https://") || trimmed.length > MAX_REVIEW_URL_LENGTH) {
        return {
          ok: false,
          error: "review_source_url must be null, empty, or an https URL of at most 500 characters",
        };
      }
      review_source_url = trimmed;
    }
  }

  const rating_visible = record.rating_visible === true;

  let resend_api_key: string | null = null;
  if (typeof record.resend_api_key === "string") {
    const trimmedKey = record.resend_api_key.trim();
    if (trimmedKey && !trimmedKey.includes("...")) {
      resend_api_key = trimmedKey;
    }
  }

  let notification_email: string | null = null;
  if (typeof record.notification_email === "string") {
    const trimmedEmail = record.notification_email.trim();
    if (trimmedEmail) {
      notification_email = trimmedEmail;
    }
  }

  const email_notifications_enabled =
    typeof record.email_notifications_enabled === "boolean"
      ? record.email_notifications_enabled
      : false;

  let email_subject_template: string | null = null;
  if (typeof record.email_subject_template === "string") {
    email_subject_template = record.email_subject_template.trim() || null;
  }

  let email_html_template: string | null = null;
  if (typeof record.email_html_template === "string") {
    email_html_template = record.email_html_template.trim() || null;
  }

  return {
    ok: true,
    value: {
      rating_value,
      review_count: reviewCount,
      review_source_url,
      rating_visible,
      resend_api_key,
      notification_email,
      email_notifications_enabled,
      email_subject_template,
      email_html_template,
    },
  };
}

async function authenticate(
  req: Request,
): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { ok: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.substring(7);
  if (!token) {
    return { ok: false, error: "Missing or invalid authorization header" };
  }

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const payload = await verify(token, key);
    if (typeof payload.sub !== "string" || payload.sub.length === 0) {
      return { ok: false, error: "Invalid or expired token" };
    }
    return { ok: true, userId: payload.sub };
  } catch {
    return { ok: false, error: "Invalid or expired token" };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let userId: string | null = null;
  if (req.method === "POST") {
    const auth = await authenticate(req);
    if (!auth.ok) {
      return json({ error: auth.error }, 401);
    }
    userId = auth.userId;
  }

  const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
  try {
    await client.connect();
    await ensureSchema(client);

    if (req.method === "GET") {
      const result = await client.queryObject<SettingsRow>(SELECT_SQL);
      const row = result.rows[0];
      const body = row ? shape(row) : missingRow();
      return json(body, 200, { "Cache-Control": "no-cache, no-store, must-revalidate" });
    }

    const roleResult = await client.queryObject<{ role: string | null }>(
      "SELECT role FROM user_roles WHERE user_id = $1",
      [userId],
    );
    if (roleResult.rows[0]?.role !== "admin") {
      return json({ error: "Admin role required" }, 403);
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    if (body?.action === "test_email") {
      const recipient = body.recipient_email || body.to;
      if (!recipient) {
        return json({ error: "recipient_email is required for test email" }, 400);
      }

      // Fetch saved settings for API key
      const current = await client.queryObject<{
        resend_api_key: string | null;
        notification_email: string | null;
        email_subject_template: string | null;
        email_html_template: string | null;
      }>("SELECT resend_api_key, notification_email, email_subject_template, email_html_template FROM amz_app.site_settings WHERE id = 1");

      const savedKey = current.rows[0]?.resend_api_key;
      const finalKey = (body.resend_api_key && !body.resend_api_key.includes("...")) ? body.resend_api_key : savedKey;

      if (!finalKey) {
        return json({ error: "No Resend API Key configured. Please enter your Resend API Key first." }, 400);
      }

      const subject = body.subject || "AMZ AD SCOUT: Test Lead Delivery Verification";
      const htmlContent = body.html || `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0284c7; margin-top: 0;">🚀 Resend Integration Successful!</h2>
          <p style="font-size: 15px; color: #334155;">
            Your Resend API key and notification email pipeline are connected and functioning properly.
          </p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0; font-size: 14px;">
            <p style="margin: 4px 0;"><strong>Recipient:</strong> ${recipient}</p>
            <p style="margin: 4px 0;"><strong>Dispatched At:</strong> ${new Date().toUTCString()}</p>
            <p style="margin: 4px 0;"><strong>Sender:</strong> AMZ Leads &lt;onboarding@resend.dev&gt;</p>
          </div>
          <p style="font-size: 13px; color: #64748b;">
            All future leads received through your website audit forms will be sent to this email address.
          </p>
        </div>
      `;

      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${finalKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AMZ Leads <onboarding@resend.dev>",
            to: recipient.split(",").map((e: string) => e.trim()).filter((e: string) => e.length > 0),
            subject,
            html: htmlContent,
          }),
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          const errMsg = resendData?.message || resendData?.error || "Resend rejected the request";
          console.warn("Resend test error:", resendData);
          return json({ 
            error: `Resend error (${resendResponse.status}): ${errMsg}`,
            details: resendData 
          }, 400);
        }

        return json({ 
          success: true, 
          message: "Test email delivered successfully via Resend!",
          id: resendData?.id 
        });
      } catch (sendErr: any) {
        return json({ error: sendErr.message || "Failed to reach Resend API" }, 500);
      }
    }

    const parsed = parseSettings(body);
    if (!parsed.ok) {
      return json({ error: parsed.error }, 400);
    }

    const existing = await client.queryObject<{
      rating_value: string | number;
      review_count: string | number;
      review_source_url: string | null;
      rating_visible: boolean;
      resend_api_key: string | null;
      notification_email: string | null;
      email_notifications_enabled: boolean;
      email_subject_template: string | null;
      email_html_template: string | null;
    }>("SELECT rating_value, review_count, review_source_url, rating_visible, resend_api_key, notification_email, email_notifications_enabled, email_subject_template, email_html_template FROM amz_app.site_settings WHERE id = 1");

    const existingRow = existing.rows[0];

    // If resend_api_key was not sent or kept masked, preserve existing one
    let finalApiKey = parsed.value.resend_api_key;
    if (!finalApiKey) {
      finalApiKey = existingRow?.resend_api_key ?? null;
    }

    const finalRating = (body.rating_value !== undefined && body.rating_value !== null)
      ? parsed.value.rating_value
      : (existingRow ? Number(existingRow.rating_value) : 0);

    const finalReviewCount = (body.review_count !== undefined && body.review_count !== null)
      ? parsed.value.review_count
      : (existingRow ? Number(existingRow.review_count) : 0);

    const finalReviewUrl = (body.review_source_url !== undefined)
      ? parsed.value.review_source_url
      : (existingRow?.review_source_url ?? null);

    const finalRatingVisible = (body.rating_visible !== undefined)
      ? parsed.value.rating_visible
      : (existingRow?.rating_visible ?? false);

    const finalNotificationEmail = (body.notification_email !== undefined)
      ? parsed.value.notification_email
      : (existingRow?.notification_email ?? null);

    const finalEmailEnabled = (body.email_notifications_enabled !== undefined)
      ? parsed.value.email_notifications_enabled
      : (existingRow?.email_notifications_enabled ?? false);

    const finalSubjectTemplate = (body.email_subject_template !== undefined)
      ? parsed.value.email_subject_template
      : (existingRow?.email_subject_template ?? null);

    const finalHtmlTemplate = (body.email_html_template !== undefined)
      ? parsed.value.email_html_template
      : (existingRow?.email_html_template ?? null);

    const saved = await client.queryObject<SettingsRow>(UPSERT_SQL, [
      finalRating,
      finalReviewCount,
      finalReviewUrl,
      finalRatingVisible,
      finalApiKey,
      finalNotificationEmail,
      finalEmailEnabled,
      finalSubjectTemplate,
      finalHtmlTemplate,
    ]);
    const row = saved.rows[0];
    if (!row) {
      throw new Error("Upsert returned no row");
    }
    return json(shape(row));
  } catch (error) {
    console.error("neon-site-settings database error:", error);
    return json({ error: "Database error" }, 500);
  } finally {
    try {
      await client.end();
    } catch {
      // Connection may already be closed or never opened.
    }
  }
});
