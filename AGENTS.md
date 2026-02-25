# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a single full-stack TypeScript/React boilerplate app (not a monorepo). Express backend + Vite-powered React frontend served together via `vite-express` on port 3000. No database or external services required.

### Prerequisites

- **Node.js >= 24.13.1** and **npm >= 11.10.1** are required (see `engines` in `package.json`). The VM snapshot has Node 24 installed via nvm (`nvm use 24`).
- A `.env` file must exist in the project root (copy from `.envTemplate` if missing: `cp .envTemplate .env`). The template defaults work for development.

### Running the app

- `npm run dev` — starts the unified dev server (Express + Vite HMR) on port 3000. Uses `nodemon` for server auto-restart on file changes.
- Login credentials for the hardcoded test user: username `test`, password `test`.

### Available commands

See `README.md` for full documentation. Key commands: `npm run lint`, `npm run lint:fix`, `npm run type-check`, `npm run build`, `npm run dev`.

### Known caveats

- **Cypress E2E tests**: `npm run test:e2e` fails with an ESM compatibility error (`ReferenceError: exports is not defined in ES module scope`). This is caused by Cypress 14's internal ts-node loader conflicting with the project's `"type": "module"` setting. The dev server, lint, type-check, and build all work correctly.
- The dev server must be running before Cypress tests can execute (they target `http://localhost:3000`).
