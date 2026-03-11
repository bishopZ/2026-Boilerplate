# Cypress E2E Tests

End-to-end tests for the boilerplate. Run against the live dev server.

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
- **routing/** — Legacy URL redirects
