# API Guide

This project exposes a compact HTTP API designed for:

- predictable REST-style resource handling
- compatibility with browser form workflows
- easy migration to TanStack Query or GraphQL clients

## Endpoint Inventory

### Session/Auth

- `POST /api/session` — create an authenticated session (JSON response)
- `DELETE /api/session` — clear the authenticated session (`204 No Content`)

Legacy compatibility endpoints (browser redirect flow):

- `POST /login/password` — form login, redirects to `/product` or `/login`
- `GET /logout` — clears cookie, redirects to `/`

### Application API

- `GET /api/key` — returns the local-storage encryption key (requires auth)

## REST Conventions Used

- Resource-oriented paths for API clients (`/api/session`, `/api/key`)
- HTTP methods map to intent:
  - `POST` creates a session
  - `DELETE` ends a session
  - `GET` reads server data
- Auth/session state is cookie-backed and enforced server-side
- Error payloads use structured JSON for API routes

## Migration-Ready Contract Rules

When adding or changing endpoints:

1. Prefer `/api/*` resource paths over action verbs in URLs.
2. Keep response shapes stable and typed.
3. Use standard status codes (`200`, `201`, `204`, `400`, `401`, `403`, `429`, `500`).
4. Keep legacy endpoints only as temporary compatibility shims.
5. Update `src/server/config/constants.ts` and `src/client/utilities/constants.ts` together.
6. Add or update tests at the right layer (E2E for route contracts, unit/integration where practical).

## Why this helps TanStack Query and GraphQL migrations

- TanStack Query works best with stable, resource-oriented HTTP contracts; `/api/session` and `/api/key` are query/mutation friendly.
- GraphQL migration is easier when REST behavior is already consistent and typed, making resolver mapping straightforward.
- Keeping client endpoint constants centralized reduces transport-coupling and drift during staged migrations.
