# 2026 Boilerplate for TypeScript/React

Use this boilerplate to build production-ready web apps. Full-stack TypeScript, React 19, and Express with authentication, encrypted persistence, SEO, i18n, accessibility, and a modern developer experience—all configured and ready to extend.

## Who this README is for

This file is the fast, practical entry point for vibe coders and junior developers who want to start building quickly.

If you want deep implementation details (architecture, auth internals, reducer patterns, agent workflows), use the linked docs in the **Deep Technical Context** section.

## Features

- **Core:** TypeScript, React 19, Vite, Express, Passport auth (test user), encrypted localStorage persistence, Redux Toolkit (persistent + non-persistent slices), React Router with lazy-loaded pages
- **SEO & metadata:** Sitemap, `<PageMeta>` component, React 19 document metadata (title, description, Open Graph, Twitter, canonical), Terms and Privacy pages
- **Accessibility:** Skip-to-content link, stable IDs (`useId`), aria-live announcements (`useAnnounce`), Chakra UI
- **i18n:** react-intl, locales (en, ar, fr, zh), RTL for Arabic, language switcher, English fallback—[use it or ignore it](docs/I18N.md); when you need translation, it's ready
- **UX and polish:** Page transitions (`<PageTransition>`), animated buttons (Framer Motion), scroll-to-top on route change, light/dark mode
- **Resilience:** Error boundaries, centralized client error handler, server error-handler middleware, Suspense boundaries
- **Developer experience:** Cypress E2E, ESLint (custom config), type-check script, `npm run test` for full pre-commit/CI (lint + type-check + E2E)

## Getting Started

### Start a New Project from This Boilerplate

Use this workflow when you want to turn this repository into your own product instead of contributing back.

1. Clone the repo: `git clone git@github.com:bishopZ/2026-Boilerplate.git` and `cd 2026-Boilerplate`
2. Remove git history: `rm -rf .git` then `git init`
3. Run the rebrand skill with your new project details: *Use the skill at `skills/rebrand/SKILL.md` with `site_title="<Your Project Title>"` and `site_description="<Your Project Description>"`*
4. Create your first commit
5. Run the [Development Setup](#development-setup) below

### Development Setup

1. Copy the env template: `cp .envTemplate .env` — then set `LOCAL_STORAGE_KEY` and `SESSION_SECRET`. Generate a session secret with: `openssl rand -base64 32`
2. Run `npm install`
3. Run `npm run dev`
4. Login with username `test` and password `test`

## Build Fast (Most Common Commands)

| Goal | Command |
|---|---|
| Start coding | `npm run dev` |
| Validate before commit | `npm run test` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Run production server | `npm start` |

For the full command reference and workflows, see [docs/SCRIPTS.md](docs/SCRIPTS.md).  
For script implementation details (like i18n validation), see [scripts/README.md](scripts/README.md).

## Deep Technical Context (AI Agents + Advanced Developers)

### AI/Agent Guidance

- [AGENTS.md](AGENTS.md) — Project operating instructions and coding expectations
- [.cursor/rules/](.cursor/rules/) — Enforced rule files for React, Redux, and server patterns
- Skills:
  - [skills/rebrand/SKILL.md](skills/rebrand/SKILL.md)
  - [skills/hidden-admin-auth/SKILL.md](skills/hidden-admin-auth/SKILL.md)

### Architecture and Implementation Docs

- [Architecture](docs/ARCHITECTURE.md) — System diagram, directory structure, key patterns
- [Authentication](docs/AUTHENTICATION.md) — JWT flow, hardcoded user, and migration paths
- [Client](src/client/README.md) — How the frontend is organized
- [Hooks](src/client/hooks/README.md) — useState vs custom hook vs Redux
- [Redux](src/client/redux/README.md) — Persistence, slices, pitfalls
- [Server](src/server/README.md) — MVC structure, routes, middleware
- [Cypress](cypress/README.md) — How to run E2E tests
- [Technology choices](docs/TECHNOLOGY.md) — Why this stack
- [Contributing](docs/CONTRIBUTING.md) — How to contribute
- [Internationalization](docs/I18N.md) — i18n guide

## Requirements

- Node.js >= 24.13.1, npm >= 11.10.1
- `.env` file (copy from `.envTemplate`)

E2E tests require the dev server running and a supported browser. See [cypress/README.md](cypress/README.md).

## Contributing

We welcome contributions. See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## Sponsors

[Time 2 Magic](https://time2magic.com)

## License

MIT
