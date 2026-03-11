---
name: playwright-migration
description: Migrate this repository from Cypress E2E testing to Playwright with minimal disruption and clear validation evidence.
---

# Cypress to Playwright Migration

Use this skill when a task asks to replace Cypress with Playwright, or to move E2E coverage to Playwright while preserving existing test intent.

## Goal

Replace Cypress tooling, commands, and docs with Playwright equivalents, while keeping E2E coverage for auth, accessibility, SEO metadata, and i18n flows.

## Migration Rules

- Do not leave a mixed default setup. After migration, `npm run test:e2e` should execute Playwright.
- Keep test coverage parity with current Cypress suites before adding new scenarios.
- Prefer shared helpers to avoid duplicated browser setup/login steps.
- Keep credentials env-driven (`CYPRESS_TEST_*` can remain as compatibility input if needed).

## Files To Update

### 1) Dependencies and scripts (`package.json`)

- Remove Cypress package and Cypress-only scripts.
- Add Playwright (`@playwright/test`) and scripts:
  - `test:e2e`: `playwright test`
  - `test:e2e:open` (or equivalent): `playwright test --ui`
- Keep `npm run test` wired to lint + type-check + E2E.

### 2) Test runner config

- Remove `cypress.config.ts`.
- Add `playwright.config.ts` with:
  - `baseURL` pointing to `http://localhost:3000`
  - sensible defaults for retries, trace-on-failure, and HTML reporter
  - `webServer` config if this repo should auto-start dev server for tests

### 3) Test files

- Create `playwright/e2e/` (or `tests/e2e/`) structure matching current intent:
  - auth/login
  - accessibility/skip-link
  - seo/page-meta
  - i18n/language-switcher
- Port assertions and selectors from Cypress to Playwright idioms.
- Add shared helpers/fixtures for repeated flows.

### 4) Documentation

Update all references from Cypress to Playwright:

- `README.md`
- `AGENTS.md`
- `docs/CONTRIBUTING.md`
- `docs/SCRIPTS.md`
- `cypress/README.md` (either remove or convert into Playwright docs)

### 5) Changelog

- Add an `Unreleased` entry describing the migration.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run `npm run test:e2e` and confirm all migrated tests pass
- Run `npm run test` to verify the default pre-commit command still works
- Verify no stale Cypress references remain:
  - `rg "cypress|Cypress\\." README.md AGENTS.md docs package.json src playwright cypress`

## Done Criteria

- Playwright is the default E2E framework in scripts and docs.
- Existing E2E scenarios are migrated and passing.
- Cypress-specific config and stale references are removed or intentionally retained with explanation.
