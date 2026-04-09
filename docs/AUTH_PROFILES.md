# Auth Profiles (Starter Modes)

This boilerplate supports a profile switch for auth backing strategy via `AUTH_PROFILE`.

## Profiles

- `local` (default): uses the in-code starter account (`localUser` in `src/server/services/auth.ts`)
- `supabase`: starter profile for future Supabase-backed auth wiring
- `postgres`: starter profile for future Postgres-backed auth wiring

## Environment setup

In `.env`:

- `AUTH_PROFILE=local` (default)
- optional placeholders for future integrations:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `DATABASE_URL`

## Current starter behavior

- `local`: login works with the starter credentials.
- `supabase` / `postgres`: login is intentionally blocked until provider wiring is implemented; the server logs a starter-mode warning.

## Why this exists

This keeps local onboarding simple while making the migration path to real auth explicit and configurable from day one.
