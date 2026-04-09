# AGENTS.md

## Project Overview

2026 Boilerplate is a full-stack TypeScript/React web app with an Express backend. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system diagram and directory structure.

## Skills

- Skills live in `skills/<skill-name>/SKILL.md`.
- If a request matches a skill, read and follow that skill before implementing changes.
- `skills/rebrand/SKILL.md` — Rebrand the boilerplate into a new project using a new site title and description.
- `skills/hidden-admin-auth/SKILL.md` — Configure the private section as a hidden admin utility and rotate hardcoded default credentials safely.
- `skills/migrate-design-system-to-shadcn/SKILL.md` — Migrate UI from Chakra to shadcn/ui and fully remove Chakra dependencies.
- `skills/add-form-manager/SKILL.md` — Introduce React Hook Form + Zod with typed, reusable form validation patterns.
- `skills/playwright-migration/SKILL.md` — Migrate the E2E stack from Cypress to Playwright in a controlled, test-first rollout.
- `skills/policy-guide/SKILL.md` — Maintain the combined policy-writing guide page and keep routes/tests/docs aligned.
- `skills/add-redirect/SKILL.md` — Add or update URL redirects with status-code guidance and E2E coverage.
- `skills/migrate-api-to-tanstack-query/SKILL.md` — Migrate REST client usage to TanStack Query with caching and staged rollout.
- `skills/migrate-api-to-graphql-client/SKILL.md` — Migrate REST client usage to a GraphQL client path with incremental parity checks.
- `skills/migrate-ci-github-to-gitlab/SKILL.md` — Replace GitHub Actions CI with GitLab CI/CD while preserving lint, typecheck, and Cypress E2E.

## Development Setup

1. Requires Node.js >= 24.13.1 and npm >= 11.10.1
2. Copy `.envTemplate` to `.env` if `.env` doesn't exist
3. Run `npm install`
4. Run `npm run dev` to start the dev server on port 3000

## Key Commands

- `npm run dev` — development server (Express + Vite HMR)
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run type-check` — TypeScript type verification
- `npm run build` — production build
- `npm run test` — Full suite: lint + type-check + E2E
- `npm run test:e2e` — Cypress E2E tests (dev server must be running)

## Code Guidelines

- Use arrow functions exclusively. Never use `class`.
- Use Chakra UI for all UI components.
- Follow the MVC pattern on the server (routes → controllers → services).
- Redux for global state; `useState`/`useReducer` for component-local state.
- See `src/client/redux/README.md` for state management patterns.
- See `src/client/hooks/README.md` for custom hook patterns.
- See Cursor rules in `.cursor/rules/`:
  - `.cursor/rules/react-components.mdc`
  - `.cursor/rules/state-management.mdc`
  - `.cursor/rules/server-patterns.mdc`

## Documentation Guides

- The `docs/` folder contains project-wide guides and expectations:
  - `docs/ARCHITECTURE.md`
  - `docs/AUTHENTICATION.md`
  - `docs/FEATURE_FLAGS.md`
  - `docs/AUTH_PROFILES.md`
  - `docs/API.md`
  - `docs/CONTRIBUTING.md`
  - `docs/I18N.md`
  - `docs/REDIRECTS.md`
  - `docs/SCRIPTS.md`
  - `docs/TECHNOLOGY.md`

## Feature Change Checklist

When adding or changing a feature, check all affected surfaces before opening a PR:

- Update `CHANGELOG.md` (`Unreleased` section).
- Update or add automated tests at the right layer (unit/integration/E2E as appropriate); avoid expanding E2E scope unless the change affects a cross-cutting user journey.
- Update locale strings in `src/client/locales/*.json` for any UI text changes.
- Update docs in `docs/` and/or component/service READMEs when behavior or workflow changes.
- Update `.cursor/rules/` and `skills/` when agent guidance or SOPs are affected.

## Testing

- Login credentials: username `test`, password `test`
- E2E tests are in `cypress/e2e/` and require the dev server to be running
- The Cypress suite is intentionally compact and contract-focused for easier migration to other test frameworks.
- Before committing: `npm run test`

## Cursor Cloud specific instructions

- Do not create screen recordings by default. Ask the user first and wait for explicit approval before using screen recording tools.
- Node.js 24+ is required. The VM uses nvm; run `source ~/.nvm/nvm.sh && nvm use 24.14.1` before any npm command if not already active.
- The `.env` file uses Node's `--env-file` flag (via `nodemon`), which does **not** strip quotes from values. Do not wrap `.env` values in quotes — they become part of the literal value.
- The `SESSION_SECRET` validator rejects any value containing the substring `secret-here` (the `.envTemplate` default). Generate a fresh random string without that substring.
- `npm run build` (`tsc -b && vite build`) has a pre-existing type error in `src/client/utilities/encryption.ts` related to `Uint8Array`/`BufferSource` under TypeScript 5.9. `npm run type-check` (`tsc --noEmit`) passes cleanly; use that for validation instead of `npm run build`.
- The `accessibility/skip-link.cy.ts` Cypress test fails in headless Chrome in this VM (focus behavior difference). This is pre-existing and not caused by environment setup.
- Before running `npm run test:e2e`, ensure the dev server is already running (`npm run dev`). Unset any `SESSION_SECRET` or `LOCAL_STORAGE_KEY` shell variables before starting the dev server to avoid env pollution — the server reads from `.env` via `--env-file`.
- The login API endpoint is `/login/password` (form-based) or `POST /api/session` (REST-style). Both require a CSRF token from the `csrf-token` cookie.
