import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";
import {
  parseCaseStudyImport,
  slugify,
  validateCreateBody,
  validateUpdateBody,
  type CaseStudyPatch,
  type CaseStudyWrite,
} from "./validate.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const MAX_BODY_BYTES = 1_048_576;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type SqlClient = {
  queryObject<T = Record<string, unknown>>(
    query: string,
    args?: unknown[],
  ): Promise<{ rows: T[] }>;
};

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extraHeaders },
  });

function normalizeRow(row: Record<string, unknown>): Record<string, unknown> {
  const copy = { ...row };
  if (typeof copy.results === "string") {
    try {
      copy.results = JSON.parse(copy.results);
    } catch {
      // Keep the driver value if it is not JSON text.
    }
  }
  return copy;
}

function isUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const record = error as { code?: string; fields?: { code?: string } };
  return record.fields?.code === "23505" || record.code === "23505";
}

async function requireAdmin(req: Request, client: SqlClient): Promise<{ userId: string } | { response: Response }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { response: json({ error: "Missing or invalid authorization header" }, 401) };
  }
  const token = authHeader.substring(7).trim();
  if (!token) {
    return { response: json({ error: "Missing or invalid authorization header" }, 401) };
  }

  let userId = "";
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(Deno.env.get("JWT_SECRET") ?? ""),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const payload = await verify(token, key);
    userId = typeof payload.sub === "string" ? payload.sub : "";
  } catch {
    return { response: json({ error: "Invalid or expired token" }, 401) };
  }
  if (!userId) return { response: json({ error: "Invalid or expired token" }, 401) };

  const result = await client.queryObject<{ role: string | null }>(
    "SELECT role FROM user_roles WHERE user_id = $1",
    [userId],
  );
  if (result.rows[0]?.role !== "admin") {
    return { response: json({ error: "Admin role required" }, 403) };
  }
  return { userId };
}

async function readBody(req: Request): Promise<{ ok: true; value: unknown } | { ok: false; response: Response }> {
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return { ok: false, response: json({ error: "Request body exceeds 1 MB" }, 400) };
  }
  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return { ok: false, response: json({ error: "Request body exceeds 1 MB" }, 400) };
  }
  if (raw.trim() === "") return { ok: true, value: {} };
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false, response: json({ error: "Invalid JSON body" }, 400) };
  }
}

async function allocateSlug(db: SqlClient, base: string, reserved: Set<string>): Promise<string> {
  const root = base || "case-study";
  for (let n = 1; n < 1000; n++) {
    const candidate = n === 1 ? root : `${root}-${n}`;
    if (reserved.has(candidate)) continue;
    const existing = await db.queryObject(
      "SELECT 1 FROM amz_app.case_studies WHERE slug = $1",
      [candidate],
    );
    if (existing.rows.length === 0) {
      reserved.add(candidate);
      return candidate;
    }
  }
  throw new Error("Could not allocate a unique slug");
}

async function insertRow(
  db: SqlClient,
  row: CaseStudyWrite,
  reserved: Set<string>,
): Promise<Record<string, unknown>> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = await allocateSlug(db, slugify(row.brand_name), reserved);
    try {
      const result = await db.queryObject<Record<string, unknown>>(
        `INSERT INTO amz_app.case_studies (
           slug, brand_name, channel, category, logo_url, challenge, solution,
           results, time_period, testimonial_quote, testimonial_author, published, sort_order
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12,$13)
         RETURNING *`,
        [
          slug,
          row.brand_name,
          row.channel,
          row.category,
          row.logo_url,
          row.challenge,
          row.solution,
          JSON.stringify(row.results),
          row.time_period,
          row.testimonial_quote,
          row.testimonial_author,
          row.published,
          row.sort_order,
        ],
      );
      return normalizeRow(result.rows[0]);
    } catch (error) {
      reserved.delete(slug);
      if (!isUniqueViolation(error) || attempt === 4) throw error;
    }
  }
  throw new Error("Could not allocate a unique slug");
}

async function triggerVercelDeploy(): Promise<void> {
  const hook = Deno.env.get("VERCEL_DEPLOY_HOOK_URL");
  if (!hook) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    await fetch(hook, { method: "POST", signal: controller.signal });
  } catch (error) {
    console.error("Vercel deploy hook failed:", error);
  } finally {
    clearTimeout(timer);
  }
}

function affectsPublicContent(publishedBefore: boolean, publishedAfter: boolean): boolean {
  return publishedBefore || publishedAfter;
}

async function listPublic(client: SqlClient, slug: string | null): Promise<Response> {
  const cache = { "Cache-Control": "public, max-age=60" };
  if (slug !== null) {
    const result = await client.queryObject(
      `SELECT * FROM amz_app.case_studies
       WHERE published = true AND slug = $1`,
      [slug],
    );
    if (result.rows.length === 0) return json({ error: "Case study not found" }, 404);
    return json({ item: normalizeRow(result.rows[0] as Record<string, unknown>) }, 200, cache);
  }
  const result = await client.queryObject(
    `SELECT * FROM amz_app.case_studies
     WHERE published = true
     ORDER BY sort_order ASC, created_at DESC`,
  );
  return json(
    { items: result.rows.map((row) => normalizeRow(row as Record<string, unknown>)) },
    200,
    cache,
  );
}

async function listAdmin(client: SqlClient): Promise<Response> {
  const result = await client.queryObject(
    `SELECT * FROM amz_app.case_studies
     ORDER BY sort_order ASC, created_at DESC`,
  );
  return json(
    { items: result.rows.map((row) => normalizeRow(row as Record<string, unknown>)) },
    200,
    { "Cache-Control": "no-store" },
  );
}

async function createOne(client: SqlClient, row: CaseStudyWrite): Promise<Response> {
  const item = await insertRow(client, row, new Set());
  if (item.published === true) await triggerVercelDeploy();
  return json({ item }, 201);
}

async function updateOne(client: SqlClient, id: string, patch: CaseStudyPatch): Promise<Response> {
  const existing = await client.queryObject<{ published: boolean }>(
    "SELECT published FROM amz_app.case_studies WHERE id = $1",
    [id],
  );
  if (existing.rows.length === 0) return json({ error: "Case study not found" }, 404);
  const publishedBefore = existing.rows[0].published === true;

  if (patch.slug) {
    const clash = await client.queryObject(
      "SELECT 1 FROM amz_app.case_studies WHERE slug = $1 AND id <> $2",
      [patch.slug, id],
    );
    if (clash.rows.length > 0) return json({ error: "Slug is already in use" }, 400);
  }

  const assignments: string[] = [];
  const values: unknown[] = [];
  const assign = (column: string, value: unknown, cast = "") => {
    values.push(value);
    assignments.push(`${column} = $${values.length}${cast}`);
  };

  if (patch.slug !== undefined) assign("slug", patch.slug);
  if (patch.brand_name !== undefined) assign("brand_name", patch.brand_name);
  if (patch.channel !== undefined) assign("channel", patch.channel);
  if (patch.category !== undefined) assign("category", patch.category);
  if (patch.logo_url !== undefined) assign("logo_url", patch.logo_url);
  if (patch.challenge !== undefined) assign("challenge", patch.challenge);
  if (patch.solution !== undefined) assign("solution", patch.solution);
  if (patch.results !== undefined) assign("results", JSON.stringify(patch.results), "::jsonb");
  if (patch.time_period !== undefined) assign("time_period", patch.time_period);
  if (patch.testimonial_quote !== undefined) assign("testimonial_quote", patch.testimonial_quote);
  if (patch.testimonial_author !== undefined) assign("testimonial_author", patch.testimonial_author);
  if (patch.published !== undefined) assign("published", patch.published);
  if (patch.sort_order !== undefined) assign("sort_order", patch.sort_order);
  assignments.push("updated_at = now()");
  values.push(id);

  const result = await client.queryObject<Record<string, unknown>>(
    `UPDATE amz_app.case_studies SET ${assignments.join(", ")} WHERE id = $${values.length} RETURNING *`,
    values,
  );
  if (result.rows.length === 0) return json({ error: "Case study not found" }, 404);
  const item = normalizeRow(result.rows[0]);
  if (affectsPublicContent(publishedBefore, item.published === true)) await triggerVercelDeploy();
  return json({ item });
}

async function deleteOne(client: SqlClient, id: string): Promise<Response> {
  const result = await client.queryObject<{ published: boolean }>(
    "DELETE FROM amz_app.case_studies WHERE id = $1 RETURNING published",
    [id],
  );
  if (result.rows.length === 0) return json({ error: "Case study not found" }, 404);
  if (result.rows[0].published === true) await triggerVercelDeploy();
  return json({ ok: true });
}

async function importCsv(client: Client, body: unknown): Promise<Response> {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Request body must be a JSON object" }, 400);
  }
  const record = body as Record<string, unknown>;
  if (typeof record.csv !== "string") return json({ error: "csv must be a string" }, 400);
  if (typeof record.dry_run !== "boolean") return json({ error: "dry_run must be a boolean" }, 400);

  const parsed = parseCaseStudyImport(record.csv);
  if (!parsed.ok) return json({ error: parsed.error }, 400);

  if (record.dry_run) {
    const reserved = new Set<string>();
    const rows = [];
    for (const row of parsed.rows) {
      const slug = await allocateSlug(client, slugify(row.brand_name), reserved);
      rows.push({ ...row, slug });
    }
    return json({ valid: parsed.errors.length === 0, rows, errors: parsed.errors });
  }

  if (parsed.errors.length > 0) {
    return json({ error: "Validation failed", errors: parsed.errors }, 400);
  }

  const tx = client.createTransaction("import_case_studies");
  await tx.begin();
  const items: Record<string, unknown>[] = [];
  const reserved = new Set<string>();
  try {
    for (const row of parsed.rows) {
      items.push(await insertRow(tx, { ...row, published: false }, reserved));
    }
    await tx.commit();
  } catch (error) {
    try {
      await tx.rollback();
    } catch (rollbackError) {
      console.error("import rollback failed:", rollbackError);
    }
    throw error;
  }
  return json({ inserted: items.length, items });
}

function idFromUrl(url: URL): { ok: true; id: string } | { ok: false; response: Response } {
  const id = url.searchParams.get("id")?.trim() ?? "";
  if (!id || !UUID_RE.test(id)) {
    return { ok: false, response: json({ error: "A valid id query parameter is required" }, 400) };
  }
  return { ok: true, id };
}

async function handle(req: Request, client: Client): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "GET") {
    if (url.searchParams.get("all") === "1") {
      const admin = await requireAdmin(req, client);
      if ("response" in admin) return admin.response;
      return await listAdmin(client);
    }
    const slugParam = url.searchParams.get("slug");
    if (slugParam !== null && slugParam.trim() === "") {
      return json({ error: "slug is required" }, 400);
    }
    return await listPublic(client, slugParam === null ? null : slugParam.trim());
  }

  const admin = await requireAdmin(req, client);
  if ("response" in admin) return admin.response;

  if (req.method === "DELETE") {
    const id = idFromUrl(url);
    if (!id.ok) return id.response;
    return await deleteOne(client, id.id);
  }

  const body = await readBody(req);
  if (!body.ok) return body.response;

  if (req.method === "POST" && url.searchParams.get("action") === "import") {
    return await importCsv(client, body.value);
  }

  if (req.method === "POST") {
    const created = validateCreateBody(body.value);
    if (!created.ok) return json({ error: created.error }, 400);
    return await createOne(client, created.value);
  }

  const id = idFromUrl(url);
  if (!id.ok) return id.response;
  const updated = validateUpdateBody(body.value);
  if (!updated.ok) return json({ error: updated.error }, 400);
  return await updateOne(client, id.id, updated.patch);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return json({ error: "Method not allowed" }, 405);
  }

  const databaseUrl = Deno.env.get("NEON_DATABASE_URL");
  if (!databaseUrl) {
    console.error("NEON_DATABASE_URL is not set");
    return json({ error: "Internal server error" }, 500);
  }

  const client = new Client(databaseUrl);
  let connected = false;
  try {
    await client.connect();
    connected = true;
    return await handle(req, client);
  } catch (error) {
    console.error("case-studies error:", error);
    return json({ error: "Internal server error" }, 500);
  } finally {
    if (connected) {
      try {
        await client.end();
      } catch (error) {
        console.error("db close failed:", error);
      }
    }
  }
});
