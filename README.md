# 2026 Boilerplate for TypeScript/React

Use this boilerplate to build production-ready web apps. Full-stack TypeScript, React 19, and Express with authentication, encrypted persistence, SEO, i18n, accessibility, and a modern developer experience—all configured and ready to extend.

## Features

- **Core:** TypeScript, React 19, Vite, Express, Passport auth (test user), encrypted localStorage persistence, Redux Toolkit (persistent + non-persistent slices), React Router with lazy-loaded pages
- **SEO & metadata:** Sitemap, `<PageMeta>` component, React 19 document metadata (title, description, Open Graph, Twitter, canonical), Terms and Privacy pages
- **Accessibility:** Skip-to-content link, stable IDs (`useId`), aria-live announcements (`useAnnounce`), Chakra UI
- **i18n:** react-intl, locales (en, ar, fr), RTL for Arabic, language switcher, English fallback—[use it or ignore it](docs/I18N.md); when you need translation, it's ready
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

### Development Setup

1. Copy `.envTemplate` to `.env` and set `LOCAL_STORAGE_KEY` and `SESSION_SECRET`
2. Run `npm install`
3. Run `npm run dev`
4. Login with username `test` and password `test`

## Using the Boilerplate

### Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run type-check` | TypeScript check |
| `npm run test` | Full suite: lint + type-check + E2E |
| `npm run test:e2e` | Cypress headless (dev server must run) |
| `npm run test:e2e:open` | Cypress interactive runner |
| `npm run check:i18n` | Validate locale keys |

See [docs/SCRIPTS.md](docs/SCRIPTS.md) for the full script reference and [scripts/README.md](scripts/README.md) for the i18n check script.

### Common Workflows

**Before committing:** `npm run test`

**Preparing for deployment:** `npm run test` then `npm run build` then `npm run preview`

**Deploying:** `npm install` → `npm run build` → `npm start`

### AI Agents and Cursor

- **[AGENTS.md](AGENTS.md)** — Project overview and code guidelines for AI assistants
- **[.cursor/rules/](.cursor/rules/)** — Rule files for React components, Redux, and server patterns
- **Skills:** [skills/rebrand/SKILL.md](skills/rebrand/SKILL.md) (rebrand title/description), [skills/docx/SKILL.md](skills/docx/SKILL.md) (Word documents)

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — System diagram, directory structure, key patterns
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
