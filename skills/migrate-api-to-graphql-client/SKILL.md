---
name: migrate-api-to-graphql-client
description: Migrate the REST client path to a GraphQL client architecture with typed operations and incremental rollout.
---

# Migrate API to GraphQL Client Path

Use this skill when a task asks to move from REST-first client calls to a GraphQL client model.

## Goal

Introduce a GraphQL client path that can coexist with current REST endpoints during migration, then progressively replace REST usage.

## Migration Principles

- Do not break existing auth/session behavior during rollout.
- Keep migration incremental: one feature domain at a time.
- Treat GraphQL as the new data contract layer while REST stays as fallback until parity is complete.

## Files To Update

### 1) GraphQL client foundation

- Add a GraphQL client dependency (for example: Apollo Client, urql, or graphql-request) based on task constraints.
- Add shared client initialization under `src/client/data/` (for example: `graphql-client.ts`).
- Configure credential handling for cookie-based auth where needed.

### 2) Schema and operation organization

- Add a clear folder layout for operations/fragments/types (for example: `src/client/data/graphql/`).
- Keep operation names domain-oriented and stable.
- Prefer generated TypeScript types when codegen is available.

### 3) Feature rollout

- Create feature-level adapters/hooks that hide transport details from components.
- Migrate domain by domain (auth/session first if requested, then product/preferences, etc.).
- Keep equivalent behavior with current REST flows while both paths coexist.

### 4) REST deprecation plan

- Document which REST endpoints are superseded.
- Keep compatibility endpoints active until all consuming code is migrated.
- Remove legacy code only after tests prove GraphQL parity.

### 5) Docs and changelog

- Update `docs/API.md` with GraphQL migration status and contract guidance.
- Update `docs/ARCHITECTURE.md` when transport/data layers change.
- Add migration notes under `CHANGELOG.md` → `Unreleased`.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run focused E2E tests for migrated feature paths
- Verify auth/session cookies still work correctly with GraphQL requests
- Verify GraphQL errors are surfaced via existing error handling patterns

## Done Criteria

- GraphQL client path is established with a documented migration plan.
- At least one feature path is migrated without regression.
- REST compatibility strategy is explicit and time-bounded.
- Docs/changelog reflect architecture and workflow updates.
