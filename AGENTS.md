# AGENTS.md

## Project Overview

2026 Boilerplate is a full-stack TypeScript/React web app with an Express backend. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system diagram and directory structure.

## Skills

- Skills live in `skills/<skill-name>/SKILL.md`.
- If a request matches a skill, read and follow that skill before implementing changes.
- `skills/rebrand/SKILL.md` — Rebrand the boilerplate into a new project using a new site title and description.
- `skills/hidden-admin-auth/SKILL.md` — Configure the private section as a hidden admin utility and rotate hardcoded default credentials safely.

## Development Setup

1. Requires Node.js >= 24.13.1 and npm >= 11.10.1
2. Copy `.envTemplate` to `.env` if `.env` doesn't exist
3. Run `npm install`
4. Run `npm run dev` to start the dev server on port 3000

## Key Commands

- `npm run dev` — development server (Express + Vite HMR)
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run type-check` — TypeScript type verification
- `npm run test:unit` — Vitest unit/integration tests
- `npm run build` — production build
- `npm run test` — Full suite: lint + type-check + unit + E2E
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
  - `docs/CONTRIBUTING.md`
  - `docs/I18N.md`
  - `docs/SCRIPTS.md`
  - `docs/TECHNOLOGY.md`

## Feature Change Checklist

When adding or changing a feature, check all affected surfaces before opening a PR:

- Update `CHANGELOG.md` (`Unreleased` section).
- Update or add automated tests (unit/integration/E2E as appropriate).
- Update locale strings in `src/client/locales/*.json` for any UI text changes.
- Update docs in `docs/` and/or component/service READMEs when behavior or workflow changes.
- Update `.cursor/rules/` and `skills/` when agent guidance or SOPs are affected.

## Testing

- Login credentials: username `test`, password `test`
- E2E tests are in `cypress/e2e/` and require the dev server to be running
- E2E budget guardrail: keep a 4-spec contract baseline and a soft cap of 6 E2E spec files to preserve framework portability.
- Add tests for every feature at the right layer; prefer unit/integration for local logic and use E2E for cross-cutting user journeys.
- Before committing: `npm run test`

## Cursor Cloud specific instructions

- Do not create screen recordings by default. Ask the user first and wait for explicit approval before using screen recording tools.
