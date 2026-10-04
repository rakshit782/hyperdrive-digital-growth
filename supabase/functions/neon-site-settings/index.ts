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
  updated_at: Date | string;
}

interface SettingsInput {
  rating_value: number;
  review_count: number;
  review_source_url: string | null;
  rating_visible: boolean;
}

const SELECT_SQL = `
  SELECT rating_value, review_count, review_source_url, rating_visible, updated_at
  FROM site_settings
  WHERE id = 1
`;

const UPSERT_SQL = `
  INSERT INTO site_settings (
    id, rating_value, review_count, review_source_url, rating_visible, updated_at
  )
  VALUES (1, $1, $2, $3, $4, now())
  ON CONFLICT (id) DO UPDATE SET
    rating_value = EXCLUDED.rating_value,
    review_count = EXCLUDED.review_count,
    review_source_url = EXCLUDED.review_source_url,
    rating_visible = EXCLUDED.rating_visible,
    updated_at = now()
  RETURNING rating_value, review_count, review_source_url, rating_visible, updated_at
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

function missingRow() {
  return {
    rating_value: 0,
    review_count: 0,
    review_source_url: null,
    rating_visible: false,
    updated_at: null,
  };
}

function toIsoTimestamp(value: Date | string): string {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toISOString();
}

function shape(row: SettingsRow) {
  return {
    rating_value: Number(row.rating_value),
    review_count: Number(row.review_count),
    review_source_url: row.review_source_url,
    rating_visible: row.rating_visible === true,
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
  const rating = record.rating_value;
  if (typeof rating !== "number" || !Number.isFinite(rating) || rating < 0 || rating > 5) {
    return { ok: false, error: "rating_value must be a number between 0 and 5" };
  }
  const rating_value = Number(rating.toFixed(1));
  if (rating_value < 0 || rating_value > 5) {
    return { ok: false, error: "rating_value must be a number between 0 and 5" };
  }

  const reviewCount = record.review_count;
  if (
    typeof reviewCount !== "number" ||
    !Number.isInteger(reviewCount) ||
    reviewCount < 0 ||
    reviewCount > MAX_REVIEW_COUNT
  ) {
    return { ok: false, error: "review_count must be an integer greater than or equal to 0" };
  }

  const source = record.review_source_url;
  let review_source_url: string | null;
  if (source === null || source === undefined || source === "") {
    review_source_url = null;
  } else if (typeof source !== "string") {
    return {
      ok: false,
      error: "review_source_url must be null, empty, or an https URL of at most 500 characters",
    };
  } else {
    const trimmed = source.trim();
    if (trimmed === "") {
      review_source_url = null;
    } else if (!trimmed.startsWith("https://") || trimmed.length > MAX_REVIEW_URL_LENGTH) {
      return {
        ok: false,
        error: "review_source_url must be null, empty, or an https URL of at most 500 characters",
      };
    } else {
      review_source_url = trimmed;
    }
  }

  if (typeof record.rating_visible !== "boolean") {
    return { ok: false, error: "rating_visible must be a boolean" };
  }

  return {
    ok: true,
    value: {
      rating_value,
      review_count: reviewCount,
      review_source_url,
      rating_visible: record.rating_visible,
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

    if (req.method === "GET") {
      const result = await client.queryObject<SettingsRow>(SELECT_SQL);
      const row = result.rows[0];
      const body = row ? shape(row) : missingRow();
      return json(body, 200, { "Cache-Control": "public, max-age=60" });
    }

    const roleResult = await client.queryObject<{ role: string | null }>(
      "SELECT role FROM user_roles WHERE user_id = $1",
      [userId],
    );
    if (roleResult.rows[0]?.role !== "admin") {
      return json({ error: "Admin role required" }, 403);
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const parsed = parseSettings(body);
    if (!parsed.ok) {
      return json({ error: parsed.error }, 400);
    }

    const saved = await client.queryObject<SettingsRow>(UPSERT_SQL, [
      parsed.value.rating_value,
      parsed.value.review_count,
      parsed.value.review_source_url,
      parsed.value.rating_visible,
    ]);
    const row = saved.rows[0];
    if (!row) {
      throw new Error("Upsert returned no row");
    }
    return json(shape(row));
  } catch (_error) {
    console.error("neon-site-settings database error");
    return json({ error: "Database error" }, 500);
  } finally {
    try {
      await client.end();
    } catch {
      // Connection may already be closed or never opened.
    }
  }
});
