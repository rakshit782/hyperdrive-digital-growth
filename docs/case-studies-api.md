# Case studies API

Admin-managed case studies live in Neon table `public.case_studies`. The edge function verifies the dashboard JWT itself (`JWT_SECRET`) and checks `user_roles.role = 'admin'`. Public reads do not need a token.

Base URL:

`https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-case-studies`

Send `Authorization: Bearer <accessToken>` from `neon-auth-login` on every admin call. Missing, invalid, or expired tokens return `401`. A valid user who is not an admin returns `403`. Validation failures return `400` with `{ "error": "..." }`. Import row failures also include an `errors` array.

## Endpoints

| Method | Who | What |
| --- | --- | --- |
| `GET` | Public | Published rows only, `sort_order` ascending then `created_at` descending. `{ "items": [ ...all columns ] }`. `Cache-Control: public, max-age=60`. |
| `GET ?slug=<slug>` | Public | One published row as `{ "item": ... }`, or `404`. |
| `GET ?all=1` | Admin | Published and draft rows. `Cache-Control: no-store`. |
| `POST` | Admin | Create one JSON object. `201 { "item": ... }`. Slug is generated from `brand_name` (`-2`, `-3`, ... if taken). |
| `PUT ?id=<uuid>` | Admin | Partial update. Sets `updated_at` to now. `{ "item": ... }`, or `404`. |
| `DELETE ?id=<uuid>` | Admin | `{ "ok": true }`, or `404`. |
| `POST ?action=import` | Admin | CSV import. See below. |

`channel` is one of `amazon`, `walmart`, `meta`, `google`, `shopify`. `results` is `0` to `6` objects: `{ "label": string, "before": number \| null, "after": number, "unit": string }`. `logo_url`, when set, must be an `https` URL.

## CSV import

Body: `{ "csv": "<text>", "dry_run": true \| false }`. At most 200 data rows and about 1 MB.

The first physical lines that start with `#` are comments and are skipped until the header row. A header row is required. Header names are trimmed and case-insensitive. A `published` column is ignored if someone includes it; every imported row is saved as a draft (`published = false`). Any other unknown header is `400` and lists the names. No rows are written.

The template is `public/templates/case-studies-template.csv`. It has one example row. Rows whose `brand_name` starts with `EXAMPLE` (any case) are rejected with `Example row from the template - replace or delete it`.

CSV metrics are `metric1_*` through `metric4_*` only. Metrics 5 and 6 are edited in the dashboard, not in the file. A metric group is used only when its label or after-value is filled; then both label and after are required. Numbers may include commas, `$`, and `%`.

`errors` use the physical line number in the file (the template comment is line 1, the header is line 2, and the first data row is line 3): `{ "row": 3, "column": "brand_name", "message": "..." }`.

- Dry run (`dry_run: true`): `200 { "valid": false, "rows": [normalized objects], "errors": [...] }`. Nothing is saved. `rows` contains only the rows that passed validation, including the slug that would be inserted.
- Save with any row error: `400 { "error": "Validation failed", "errors": [...] }`. Nothing is saved.
- Save with no errors: one transaction, then `{ "inserted": n, "items": [...] }`.

Imports do not trigger a site rebuild. They are drafts.

## Rebuild hook

When `VERCEL_DEPLOY_HOOK_URL` is set, the function POSTs to it after a change that affects the public site: a create or update whose row is published before or after the change, or a delete of a published row. The call is awaited with a 3 second timeout. Failures are logged and do not change the API response. If the secret is unset, the hook is skipped.

## Deploy

1. In the Neon SQL editor, run `neon-migrations/2026-10-04-case-studies.sql` (also included in `neon-db-schema.sql`). It is safe to run twice.
2. Deploy the function. It reuses the existing `NEON_DATABASE_URL` and `JWT_SECRET` secrets:

```bash
supabase functions deploy neon-case-studies --project-ref hznbshxhmhtenxcuffhx
```

3. After merge, create a production-branch deploy hook in Vercel (Project Settings, Git, Deploy Hooks) and store it:

```bash
supabase secrets set VERCEL_DEPLOY_HOOK_URL=... --project-ref hznbshxhmhtenxcuffhx
```

The sitemap script (`scripts/generate-sitemap.mjs`) fetches this public GET during `postbuild`. If at least one published case study comes back, it adds `/case-studies/<slug>` (and `/case-studies` if that URL is not already listed). If the fetch fails or returns nothing, the build continues and those extra URLs are not added. `/case-studies/:slug` is rewritten to `/spa.html` in `vercel.json`.
