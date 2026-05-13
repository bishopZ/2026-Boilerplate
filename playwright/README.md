# Playwright E2E Tests

End-to-end tests for the boilerplate. Run against the live dev server.

## Requirements

- **Node.js 24+**
- **Browser binaries** — install once with `npx playwright install chromium`

The dev server starts automatically when you run `npm run test:e2e` (via `webServer` in `playwright.config.ts`). If a server is already running on port 3000, it is reused.

## Commands

- **`npm run test:e2e`** — Run all tests headlessly. Use in CI/CD or before committing.
- **`npm run test:e2e:open`** — Open the Playwright interactive UI. Use when writing or debugging tests.

The full pre-commit workflow uses `npm run test`, which runs lint, type-check, unit tests, and E2E tests. See [docs/SCRIPTS.md](../docs/SCRIPTS.md).

## Test credentials

- **Username:** `test`
- **Password:** `test`

## Test structure

Tests live in `playwright/e2e/`:

- **auth/** — Authentication behavior (valid + invalid login, rate limiting, WebMCP integration)
- **accessibility/** — Keyboard skip-link contract
- **i18n/** — Locale switch + RTL/LTR behavior
- **seo/** — Core metadata contract (title, description, canonical)
- **routing/** — Legacy URL redirects
- **layout/** — Footer layout behavior
- **security/** — HTTP response security header verification

## Shared helpers

`playwright/e2e/helpers/auth.ts` — `login()` helper and `getCredentials()` for credential-driven login steps across tests.

## Contract philosophy

Keep this suite lean:

- Prefer a **small number of representative E2E tests** over exhaustive E2E coverage.
- Add tests at the **right layer** (unit for logic, E2E for cross-page user-critical journeys).
- Use stable selectors and user-observable behavior.
- Avoid asserting every implementation detail or every metadata tag.
