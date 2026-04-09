# AGENTS.md

## Project Overview

2026 Boilerplate is a full-stack TypeScript/React web app with an Express backend. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the system diagram and directory structure.

## Skills

- Skills live at `skills/<skill-name>/SKILL.md` (repository root). If your tool defaults to a different skills folder (for example under `.cursor/`), configure it to use this `skills/` directory so guidance stays portable across editors and agents.
- If a request matches a skill, read and follow that skill before implementing changes.

### Project SOP skills

Boilerplate-specific workflows and migrations:

- `skills/add-form-manager/SKILL.md` — Introduce React Hook Form + Zod for form state, validation, and typed submission flows.
- `skills/add-redirect/SKILL.md` — Add or update URL redirects in the server redirect registry, with status-code rationale and E2E coverage.
- `skills/hidden-admin-auth/SKILL.md` — Configure the private route as a hidden admin utility; move credentials to env vars per `.envTemplate` (do not pass credentials into the skill).
- `skills/migrate-api-to-graphql-client/SKILL.md` — Migrate the REST client path to a GraphQL client architecture with typed operations and incremental rollout.
- `skills/migrate-api-to-tanstack-query/SKILL.md` — Migrate REST API usage to TanStack Query with server-state caching, invalidation, and progressive rollout.
- `skills/migrate-design-system-to-shadcn/SKILL.md` — Migrate the client UI layer from Chakra UI to shadcn/ui and fully remove Chakra dependencies.
- `skills/playwright-migration/SKILL.md` — Migrate this repository from Cypress E2E testing to Playwright with minimal disruption and clear validation evidence.
- `skills/policy-guide/SKILL.md` — Update the combined policy-writing guide page and keep linked routes, metadata, tests, and docs in sync.
- `skills/rebrand/SKILL.md` — After cloning, convert boilerplate branding to a new project identity (title, description, metadata, docs, headers).

### Bundled reference skills

General engineering and design guidance shipped with the repo:

- `skills/accessibility/SKILL.md` — Audit and improve accessibility (WCAG 2.2, keyboard navigation, screen readers).
- `skills/frontend-design/SKILL.md` — Build distinctive, production-grade frontend interfaces and avoid generic AI-default styling.
- `skills/nothing-design-skill/SKILL.md` — Apply the Nothing-inspired design system when the user explicitly requests it; do not use for generic UI tasks.
- `skills/nodejs-backend-patterns/SKILL.md` — Production-ready Node.js backends (Express/Fastify, middleware, auth, databases, API design).
- `skills/nodejs-best-practices/SKILL.md` — Node.js principles: framework choice, async patterns, security, architecture (conceptual guidance).
- `skills/nodejs-express-server/SKILL.md` — Production-ready Express servers: middleware, auth, routing, database integration.
- `skills/seo/SKILL.md` — Search visibility: meta tags, structured data, sitemaps, and related SEO work.
- `skills/typescript-advanced-types/SKILL.md` — Advanced TypeScript types: generics, conditional/mapped types, template literals, utilities.
- `skills/ui-ux-pro-max/SKILL.md` — Broad UI/UX reference data and workflows (styles, stacks, typography); uses Python under `skills/ui-ux-pro-max/scripts/`.
- `skills/vercel-composition-patterns/SKILL.md` — React composition patterns (compound components, context, fewer boolean props); includes React 19 notes.
- `skills/vercel-react-best-practices/SKILL.md` — React and Next.js performance patterns from Vercel Engineering (data fetching, bundle size, rendering).
- `skills/vite/SKILL.md` — Vite configuration, plugins, SSR, and Rolldown-related migration notes.

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
