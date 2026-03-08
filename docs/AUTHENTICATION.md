# Authentication

This project uses a simple, production-leaning auth flow built around:

- `passport-local` for username/password verification
- signed JWTs for stateless auth
- an `httpOnly` cookie (`token`) for browser session continuity
- one hardcoded default user for local use

## How it works (server + client)

## Server-side flow

1. `POST /login/password` hits `routes/auth.ts` and uses `passport-local`.
2. `verifyUser()` in `src/server/services/auth.ts` checks credentials against `fakeUser`.
3. On success, `postLogin()` signs a JWT (`HS256`, `24h`) and sets it in an `httpOnly` cookie named `token`.
4. Protected routes use `ensureAuthenticated()` in `src/server/middleware/auth.ts`.
5. `ensureAuthenticated()` verifies the cookie token and attaches decoded user data to the request.
6. On logout, `/logout` clears the `token` cookie.

## Client-side flow

1. User submits the form in `src/client/pages/Login.tsx` to `/login/password`.
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

## Default hardcoded user

The default user lives in `src/server/services/auth.ts`:

- username/email: `test`
- password: `test` (stored as PBKDF2 hash + salt in code)

This is intentionally simple for boilerplate onboarding.

## Option A: Use private routes as a hidden admin utility

If you want `/product` to act like a hidden admin utility for your own team:

1. Keep route protection (`ensureAuthenticated`) as-is.
2. Optionally remove obvious login links from public nav and access `/login` directly.
3. Change the default credentials in `fakeUser`.

### Use the skill for this setup

Use the dedicated skill:

`Use the skill at skills/hidden-admin-auth/SKILL.md with admin_username="<new_username>" and admin_password="<new_password>".`

This keeps credential rotation, docs, and test updates consistent.

### Changing username/password for the default user

1. Pick a new username and password.
2. Generate a new salt + PBKDF2 hash (same params as code), for example:

`node -e "const crypto=require('crypto'); const password='YOUR_PASSWORD'; const salt=crypto.randomBytes(8).toString('hex'); const hash=crypto.pbkdf2Sync(password,salt,100000,64,'sha512').toString('hex'); console.log({salt,hash});"`

3. Update `fakeUser.email`, `fakeUser.salt`, and `fakeUser.password` in `src/server/services/auth.ts`.
4. Update any local docs/tests that assume `test` / `test`.

## Option B: Migrate to real auth (Supabase or Postgres)

For production user management, move away from hardcoded credentials.

### Path 1 — Supabase Auth

1. Replace local login form POST flow with Supabase sign-in APIs.
2. Verify Supabase JWTs in backend middleware (using Supabase/JWKS verification).
3. Keep route guards, but read identity/claims from verified Supabase token.
4. Remove `passport-local` and `fakeUser` once migration is complete.

### Path 2 — Postgres user table

1. Add `users` table (id, email, password_hash, role, timestamps).
2. Update `verifyUser()` to query DB and compare hashes (`argon2` or `bcrypt` recommended).
3. Keep current JWT issuance middleware, but issue tokens from DB-backed identity.
4. Add password reset, lockout/rate-limit, and optional MFA over time.

### Shared migration checklist

- Store secrets in env/secret manager (never in repo).
- Rotate `SESSION_SECRET` per environment.
- Add brute-force protection and audit logging.
- Expand tests for login/logout/protected-route behavior.
- Add authorization roles/claims if admin capabilities expand.
