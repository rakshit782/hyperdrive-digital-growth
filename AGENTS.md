# Project Rules

## Backend
- Neon app data lives in the `amz_app` schema (`internship_certificates`, `site_settings`, `case_studies`). The Neon role `website-admin` has no CREATE on `public`, so new tables must go to `amz_app`; `public.users` and `public.user_roles` already exist there and stay put.
- The website never queries Neon directly. Every read or write goes through a Supabase edge function that connects with the `NEON_DATABASE_URL` secret.
- Edge functions do their own auth, so `supabase/config.toml` keeps `verify_jwt = false` for them. Admin-only actions verify the caller's JWT from the `x-admin-token` header against `public.users` / `public.user_roles`.
- When a function gains a custom request header, add it to that function's CORS `Access-Control-Allow-Headers` in the same change — a missing entry fails the browser pre-flight as "Failed to fetch".
- A function must be deployed to exist: the Supabase gateway answers 404 (`sb-error-code: NOT_FOUND`) for anything not deployed, which the browser sees as a CORS/network failure.

## Frontend
- Use `import.meta.env`, never `process.env` (the Vite + TS setup errors on the latter).
- Never send a possibly-expired access token to a function: `authService.getValidAccessToken()` refreshes first and logs out when the refresh token is dead, while `getAccessToken()` returns whatever is stored.
- Expected outcomes (expired session, blocked IP service) are reported as warnings or silently, not `console.error` — the preview treats error-level console output as a crash.
