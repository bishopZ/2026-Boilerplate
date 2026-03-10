# Cypress E2E Tests

End-to-end tests for the boilerplate. Run against the live dev server.

## Baseline E2E Budget (Portability Guardrail)

This repository intentionally keeps a small baseline E2E suite so migration to other frameworks stays practical.

- **Target baseline:** 4 contract specs
- **Soft cap:** 6 total E2E spec files in `cypress/e2e/`
- **Core contracts to preserve:**
  - auth (`auth/login.cy.ts`)
  - accessibility (`accessibility/skip-link.cy.ts`)
  - i18n (`i18n/language-switcher.cy.ts`)
  - seo (`seo/page-meta.cy.ts`)

If a change needs more than the soft cap, prefer unit/integration tests first and document why an additional E2E spec is necessary.

## Requirements

- **Development server running** — Start with `npm run dev` before running tests. Tests expect the app at http://localhost:3000.
- **Browser** — Chrome, Firefox, or Edge.

## Commands

- **`npm run test:e2e`** — Run all tests in headless mode. Use in CI/CD or before committing.
- **`npm run test:e2e:open`** — Open the Cypress interactive runner. Use when writing or debugging tests.

The full pre-commit workflow uses `npm run test`, which runs lint, type-check, and E2E tests. See [docs/SCRIPTS.md](../docs/SCRIPTS.md).

## Test Credentials

- **Username:** `test`
- **Password:** `test`

## Test Structure

Tests live in `cypress/e2e/`:

- **auth/** — Login flow
- **accessibility/** — Skip link, etc.
- **seo/** — Page metadata
- **i18n/** — Language switcher

## Adding Tests Without Over-Coupling

- Add automated tests for every new feature at the most appropriate level.
- Prefer **unit/integration** tests for local logic and service behavior.
- Add new **E2E** tests only for cross-cutting, user-critical workflows.
- Prefer extending existing contract specs before creating new E2E files.
