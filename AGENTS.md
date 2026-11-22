# Project Rules

## Backend
- Schemas: `amz_app` (owned by `website-admin`: `internship_certificates`, `case_studies`) and `amz_crm` (owned by `neondb_owner`, the website's database user: CRM tables `services`, `subscription_plans`, `clients`, `tasks`, `lead_meta`, created by `api/crm` on first use). `neondb_owner` cannot create tables in `amz_app`; put new app tables in `amz_crm`. `public.users`, `public.user_roles`, `public.leads`, `public.site_settings` and the other existing `public` tables stay put.
- The website never queries Neon directly. Every read or write goes through a Vercel function in `api/` (`api/auth/[action]`, `api/admin`, `api/public`, `api/crm`, `api/lead`, `api/meta-capi`), which connects with the server-only `NEON_DATABASE_URL` env var. Never use a `VITE_` variable for secrets: Vite publishes those to the browser.
- Admin-only actions verify the caller's JWT from the `x-admin-token` header (HS256, `JWT_SECRET`) against `public.users` / `public.user_roles`. Refresh tokens are not accepted as access tokens.
- `/api/public` only returns public data. Email settings and the Resend key are admin-only and the key is only decrypted on the server.
- Shared server code lives in `api/_lib/` (not exposed as routes). Use `.js` extensions in relative imports there (ESM).
- The old Supabase edge functions in `supabase/functions/` are no longer called by the website.

## Frontend
- Use `import.meta.env`, never `process.env` (the Vite + TS setup errors on the latter).
- Never send a possibly-expired access token to a function: `authService.getValidAccessToken()` refreshes first and logs out when the refresh token is dead, while `getAccessToken()` returns whatever is stored.
- Expected outcomes (expired session, blocked IP service) are reported as warnings or silently, not `console.error` — the preview treats error-level console output as a crash.
