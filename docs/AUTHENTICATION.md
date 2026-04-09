# Authentication

This project uses a simple, production-leaning auth flow built around:

- `passport-local` for username/password verification
- signed JWTs for stateless auth
- an `httpOnly` cookie (`token`) for browser session continuity
- login rate limiting on `POST /login/password` to reduce brute-force attempts
- one hardcoded default user for local use

## How it works (server + client)

## Server-side flow

1. `POST /api/session` (REST) and `POST /login/password` (legacy form flow) first pass through `loginRateLimiter` in `src/server/middleware/auth-rate-limit.ts`.
2. `passport-local` then calls `verifyUser()` in `src/server/services/auth.ts` using the selected `AUTH_PROFILE`.
3. On success, `postLogin()` signs a JWT (`HS256`, `24h`) and sets it in an `httpOnly` cookie named `token`.
4. Protected routes use `ensureAuthenticated()` in `src/server/middleware/auth.ts`.
5. `ensureAuthenticated()` verifies the cookie token and attaches decoded user data to the request.
6. Session teardown supports both `DELETE /api/session` (REST) and `/logout` (legacy redirect flow).

## Login rate limiting

The login endpoint includes IP-based throttling by default:

- Default max failed attempts: `5`
- Default window: `15 minutes`
- Endpoints: `POST /api/session` and `POST /login/password`

Optional env overrides in `.env`:

- `LOGIN_RATE_LIMIT_MAX_ATTEMPTS`
- `LOGIN_RATE_LIMIT_WINDOW_MS`

## Client-side flow

1. User submits the form in `src/client/pages/Login.tsx` to `/login/password` (legacy browser-friendly flow).
2. Browser receives the `token` cookie after successful login.
3. Client routes like `/product` are protected server-side (redirect to `/login` if unauthenticated).
4. On app startup, `initPreferences` calls `/api/key`; this endpoint also requires auth.
5. If authenticated, the returned encryption key is used to decrypt persisted preferences.

## JWT details

- Signing + verification: `src/server/services/jwt.ts`
- Algorithm: `HS256`
- Expiration: `24h`
- Secret source: `SESSION_SECRET`
- Startup safety: server throws if `SESSION_SECRET` is weak or still template-like

## Local auth profile (default)

The default local starter account lives in `src/server/services/auth.ts`:

- username/email: `test`
- password: `test` (stored as PBKDF2 hash + salt in code)

This is intentionally simple for boilerplate onboarding.

## Auth backing profile starter mode

Set `AUTH_PROFILE` in `.env`:

- `local` (default) — uses `localUser` in `src/server/services/auth.ts`
- `supabase` — starter profile placeholder for Supabase auth wiring
- `postgres` — starter profile placeholder for Postgres-backed user verification

When `AUTH_PROFILE` is set to `supabase` or `postgres` without provider wiring, login is intentionally blocked and the server logs a starter-mode warning.

## Option A: Use private routes as a hidden admin utility

If you want `/product` to act like a hidden admin utility for your own team:

1. Keep route protection (`ensureAuthenticated`) as-is.
2. Optionally remove obvious login links from public nav and access `/login` directly.
3. Convert credentials to env-backed admin auth (no credential values in source).

### Use the skill for this setup

Use the dedicated skill:

`Use the skill at skills/hidden-admin-auth/SKILL.md with admin_username="<new_username>" and admin_password="<new_password>".`

This keeps credential rotation, docs, and test updates consistent.

### Admin credential source of truth

For hidden-admin mode, credentials should come from env variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_SALT`
- `ADMIN_PASSWORD_HASH`

Update `.envTemplate` and set real values in `.env` for each environment.
Docs/tests should point to env-based credentials rather than hardcoded literals.

## API-first guidance

For new client integrations, prefer REST-style session endpoints over legacy redirect endpoints:

- `POST /api/session`
- `DELETE /api/session`

See `docs/API.md` for endpoint conventions and migration notes for TanStack Query / GraphQL paths.

## Option B: Migrate to real auth (Supabase or Postgres)

For production user management, move away from hardcoded credentials.

### Path 1 — Supabase Auth

1. Replace local login form POST flow with Supabase sign-in APIs.
2. Verify Supabase JWTs in backend middleware (using Supabase/JWKS verification).
3. Keep route guards, but read identity/claims from verified Supabase token.
4. Remove `passport-local` and `localUser` once migration is complete.

### Path 2 — Postgres user table

1. Add `users` table (id, email, password_hash, role, timestamps).
2. Update `verifyUser()` to query DB and compare hashes (`argon2` or `bcrypt` recommended).
3. Keep current JWT issuance middleware, but issue tokens from DB-backed identity.
4. Add password reset, tune existing login rate limits, and optional MFA over time.

### Shared migration checklist

- Store secrets in env/secret manager (never in repo).
- Rotate `SESSION_SECRET` per environment.
- Keep brute-force protection and extend audit logging hooks for new auth events.
- Expand tests for login/logout/protected-route behavior.
- Add authorization roles/claims if admin capabilities expand.
