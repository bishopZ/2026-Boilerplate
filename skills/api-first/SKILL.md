---
name: api-first
description: Maintain the OpenAPI contract in docs, regenerate TypeScript types into src/generated/api, and wire client/server imports without hand-editing generated files.
---

# API-first OpenAPI workflow

Use this skill when a task adds or changes HTTP API behavior, updates `docs/openapi.yaml`, or adjusts how API types are generated and consumed.

## Contract documentation (source of truth)

- **OpenAPI spec:** `docs/openapi.yaml` — human-reviewed contract; keep in sync with Express routes and response shapes.
- **Narrative and conventions:** `docs/API.md` — endpoint inventory, REST rules, migration guidance.

Do not treat generated TypeScript as documentation; treat the YAML + `docs/API.md` as the contract story.

## Generated artifacts (pipeline)

- **Command:** `npm run gen:api-types`
- **Input:** `docs/openapi.yaml`
- **Output:** `src/generated/api/openapi.generated.ts` (openapi-typescript; **do not edit**)
- **Hand-maintained aliases:** `src/generated/api/api-types.ts` — re-exports friendly names from `components['schemas']` for client and server imports.

After any YAML change, run `gen:api-types` and commit the updated `openapi.generated.ts`. Update `api-types.ts` when new schemas need stable export names.

## Import paths

- Prefer `@/generated/api/api-types` for shared DTOs (path alias `@/*` → `src/*`).
- Never import `openapi.generated.ts` directly from feature code unless you need path-level types; prefer `api-types.ts` for schemas.

## Tooling

- **Generator:** `openapi-typescript` (devDependency)
- **Lint:** `openapi.generated.ts` is ESLint-ignored (generated noise)

## CI / pre-commit

- Optional: add a CI step that runs `npm run gen:api-types` and fails if `git diff --exit-code` shows drift (stops committed spec from diverging from generated output). This boilerplate does not enforce that by default; add when the team wants strict parity checks.

## Validation checklist

- [ ] `docs/openapi.yaml` matches actual routes and status codes
- [ ] `npm run gen:api-types` succeeds
- [ ] `npm run type-check` passes
- [ ] `docs/API.md` and `docs/SCRIPTS.md` still describe correct paths if you moved files

## Done criteria

- Contract changes are reflected in YAML and regenerated TS.
- Client/server imports use `@/generated/api/api-types` (or documented exceptions).
- No manual edits inside `openapi.generated.ts`.
