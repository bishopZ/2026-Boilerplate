---
name: add-redirect
description: Add or update URL redirects in the server redirect registry, with status-code rationale and E2E coverage.
---

# Add Redirect

Use this skill when an old route should forward users to a new route after page renames, URL cleanup, or IA changes.

## Required Inputs

- `from_path`: Legacy URL path (example: `/old-page`)
- `to_path`: Destination URL path (example: `/new-page`)
- `status_code`: One of `301`, `302`, `307`, `308`
- `reason`: Why the redirect exists (migration note for changelog/docs)

If any input is missing, pause and ask before editing files.

## Files To Update

### 1) `src/server/config/redirects.ts`

- Add the new redirect rule to `REDIRECT_RULES`.
- Keep `from` and `to` as absolute paths beginning with `/`.
- Do not duplicate an existing `from` route; update the existing rule instead.

### 2) `cypress/e2e/routing/redirects.cy.ts`

- Add or update E2E assertions for the redirect behavior.
- Validate destination path and destination page content.

### 3) `CHANGELOG.md`

- Add an `Unreleased` entry summarizing redirect additions/changes.

### 4) `docs/REDIRECTS.md` (optional but recommended)

- Update examples or guidance if redirect policy changes.

## Status Code Guide

- `301` — Permanent move (most content migrations)
- `302` — Temporary move
- `307` — Temporary, method-preserving
- `308` — Permanent, method-preserving

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run `npm run test:e2e -- --spec cypress/e2e/routing/redirects.cy.ts`
- Manually verify query-string preservation for at least one redirect (example: `/old?a=1` -> `/new?a=1`)

## Done Criteria

- Redirect rule is added in `src/server/config/redirects.ts`.
- E2E test coverage exists for the new redirect.
- Changelog reflects the redirect change.
