---
name: migrate-api-to-tanstack-query
description: Migrate the current REST API usage to TanStack Query with server-state caching, invalidation, and progressive rollout.
---

# Migrate API to TanStack Query

Use this skill when the task is to introduce TanStack Query for REST data fetching/caching without rewriting the backend.

## Goal

Move client-side server-state logic from ad hoc calls to TanStack Query while preserving existing API behavior and auth guarantees.

## Preconditions

- Keep API contracts stable while migrating (`/api/*` endpoints first).
- For auth/session flows, prefer JSON endpoints (`POST /api/session`, `DELETE /api/session`) rather than redirect-based legacy endpoints.
- Keep route protection and cookie auth behavior unchanged unless explicitly requested.

## Files To Update

### 1) Dependencies and scripts (`package.json`)

- Add `@tanstack/react-query`.
- Add `@tanstack/react-query-devtools` only if requested.

### 2) Query client setup

- Add a shared query client module under `src/client/` (for example: `src/client/data/query-client.ts`).
- Wire `QueryClientProvider` in `src/client/main.tsx`.
- Keep provider order stable with Redux, i18n, and Chakra providers.

### 3) API access layer

- Create or update an API module under `src/client/utilities/` or `src/client/data/` with typed fetch helpers.
- Normalize request/response/error handling in one place.
- Use resource-oriented functions (`createSession`, `deleteSession`, `getEncryptionKey`) instead of endpoint-shaped function names.

### 4) Feature migration

- Replace one feature at a time with `useQuery` / `useMutation`.
- Add targeted cache invalidation where state changes occur.
- Keep form/UI behavior unchanged while moving data logic.

### 5) Docs and changelog

- Update `docs/API.md` when endpoint usage guidance changes.
- Update `docs/TECHNOLOGY.md` if TanStack Query becomes part of the default stack.
- Add migration notes under `CHANGELOG.md` → `Unreleased`.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run targeted E2E tests for migrated flows (for example `cypress/e2e/auth/login.cy.ts`)
- Verify no direct feature code still calls `fetch` for the migrated paths

## Done Criteria

- TanStack Query is integrated with a shared query client.
- Migrated features use typed query/mutation hooks.
- Auth and protected-route behavior remains correct.
- Docs and changelog reflect the new data-fetching pattern.
