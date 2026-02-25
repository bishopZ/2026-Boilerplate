# AGENTS.md

## Project Overview

2026 Boilerplate is a full-stack TypeScript/React web app with an Express backend. See [ARCHITECTURE.md](ARCHITECTURE.md) for the system diagram and directory structure.

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
- `npm run test:e2e` — Cypress E2E tests (dev server must be running)

## Code Guidelines

- Use arrow functions exclusively. Never use `class`.
- Use Chakra UI for all UI components.
- Follow the MVC pattern on the server (routes → controllers → services).
- Redux for global state; `useState`/`useReducer` for component-local state.
- See `src/client/components/data/README.md` for state management patterns.
- See `src/client/hooks/README.md` for custom hook patterns.
- Client and server `shared/` directories are separate — do not share code between them.

## Testing

- Login credentials: username `test`, password `test`
- E2E tests are in `cypress/e2e/` and require the dev server to be running
- Before committing: `npm run lint:fix && npm run type-check`
