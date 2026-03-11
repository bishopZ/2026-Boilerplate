# Cypress E2E Tests

End-to-end tests for the boilerplate. Run against the live dev server.

This suite is intentionally small and acts as a **portable contract suite** for future framework migration (for example, Cypress to Playwright).

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

- **auth/** — Core authentication behavior contract (valid + invalid login)
- **accessibility/** — Keyboard skip-link contract
- **i18n/** — Locale switch + RTL/LTR behavior contract
- **seo/** — Core metadata contract (title, description, canonical)
- **routing/** — Legacy URL redirects
- **layout/** — Footer layout behavior

## Portable Contract Philosophy

Keep this starter suite lean:

- Prefer a **small number of representative E2E tests** over exhaustive E2E coverage.
- Add tests for every feature at the **best layer** (unit/integration/E2E), not always E2E.
- Add new E2E specs only for cross-cutting, user-critical journeys.
- Prefer extending existing contract specs before creating many new files.

### Portability Rules

- Use stable selectors and user-observable behavior.
- Avoid asserting every implementation detail or every metadata tag.
- Prefer checking behavior changes (path, selected locale, direction, visibility) over exact copy strings when copy is likely to evolve.
- Avoid hardcoding environment-specific values when dynamic assertions are possible.
- Keep helpers and assertions simple so a new test framework can re-implement quickly.

### Baseline vs Extended Specs

- **Baseline contract specs (migrate first):** `auth/login.cy.ts`, `accessibility/skip-link.cy.ts`, `i18n/language-switcher.cy.ts`, `seo/page-meta.cy.ts`
- **Extended example specs (migrate second):** `auth/login-rate-limit.cy.ts`, `routing/redirects.cy.ts`, `layout/footer-position.cy.ts`
