# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added contract-first API documentation in `docs/openapi.yaml` plus generated shared API types (`src/shared/openapi.generated.ts`, `src/shared/api-types.ts`).
- Added shared `LoadingFallback` and `BackHomeCta` UI components to reduce repeated loading/CTA markup.
- Added `skills/migrate-design-system-to-shadcn/SKILL.md` to guide full Chakra-to-shadcn migration with explicit removal criteria.
- Added `skills/add-form-manager/SKILL.md` to standardize React Hook Form + Zod adoption, starting with login-form migration guidance.
- Added REST-style auth session endpoints (`POST /api/session`, `DELETE /api/session`) while keeping legacy browser auth routes for compatibility.
- Added `docs/API.md` to document API contract conventions and migration-readiness guidelines.
- Added two migration SOP skills: `skills/migrate-api-to-tanstack-query/SKILL.md` and `skills/migrate-api-to-graphql-client/SKILL.md`.
- Added a localized footer GDPR notice clarifying that only essential cookies are used by default.
- Added `skills/playwright-migration/SKILL.md` to standardize migration from Cypress to Playwright with clear file updates, validation steps, and done criteria.
- Added `cypress/e2e/layout/footer-position.cy.ts` to verify the footer remains pinned to the viewport bottom on short pages.
- Added WebMCP `increment-counter` tool registration on the private Product page, plus Cypress coverage in `cypress/e2e/auth/webmcp-increment.cy.ts`.
- Added Simplified Chinese (`zh`) locale support across the client i18n provider, language switcher, locale dictionaries, and i18n key validation.
- Added a combined policy-writing guide page at `/policies` plus a maintenance SOP in `skills/policy-guide/SKILL.md`.
- Added a config-driven redirect system in `src/server/config/redirects.ts` with middleware integration and E2E coverage (`cypress/e2e/routing/redirects.cy.ts`).
- Added redirect documentation in `docs/REDIRECTS.md` and a reusable agent SOP at `skills/add-redirect/SKILL.md`.
- Added a shared client `Link` component that unifies Chakra UI link styling with React Router navigation and standardized external-link handling.

### Changed
- Updated API auth behavior to favor REST-style `/api/*` responses for API clients while preserving legacy browser form auth endpoints as compatibility shims.
- Reduced duplication across route loading fallbacks, back-home page CTAs, and Express pass-through handlers.
- Centralized repeated rate-limit message/user literals and removed redundant store throttle literal in favor of utility defaults.
- Compacted boundary guidance docs by keeping details in architecture docs and linking from client/contributing docs.
- Refined React boundary placement: route-level `Suspense` now handles lazy page loading, `PageLayout` no longer wraps all page content in a blanket `Suspense`, and product counter actions use feature-level `ErrorBoundary` + local `Suspense`.
- Added React 19 `Activity` around loading fallbacks for route and feature loading states.
- Refactored WebMCP registration logic into `src/client/utilities/webmcp.ts` so the Product page stays focused on view behavior.
- Updated `PageLayout` to use a full-height flex column so the footer consistently sits at the bottom of the viewport.
- Replaced separate Terms/Privacy footer links with a single policy guide link and routed legacy `/privacy` and `/terms` paths to `/policies`.
- Refined testing guidance across `AGENTS.md`, `docs/CONTRIBUTING.md`, and `cypress/README.md` to keep E2E contract coverage lean and migration-friendly while still requiring feature-level automated tests at the right layer.
- Simplified `cypress/e2e/seo/page-meta.cy.ts` to assert core metadata contracts without over-coupling to every page-specific metadata field.
- Replaced client-side CryptoJS encryption/decryption with native Web Crypto API (AES-GCM + PBKDF2) in persistence flow.
### Removed
- Removed `crypto-js` and `@types/crypto-js` dependencies.
### Fixed
### Security
- Added IP-based rate limiting for `POST /login/password` with configurable env overrides (`LOGIN_RATE_LIMIT_MAX_ATTEMPTS`, `LOGIN_RATE_LIMIT_WINDOW_MS`).


## [1.2.0] - 2026-03-07

### Added

+ Added proper SEO metadata and a sitemap.xml file to public pages.
+ Added Terms of service and Privacy policy.
+ Added AI-friendly files such as AGENTS.md & docs/ARCHITECTURE.md.
+ Added a new `skills/` folder using `skills/<skill-name>/SKILL.md` format, including `skills/rebrand/SKILL.md` for rebranding title/description metadata across `index.html`, `package.json`, `README.md`, and header branding.
+ Added a shared `PageMeta` component that maps page title/description to full metadata fields using React 19 metadata tags (Open Graph, Twitter, canonical, and mobile tags), with usage across every page and Cypress coverage.
+ Added React 19 meta tags.
+ Added ScrollToTop functionality on route change.
+ Added a shared `PageTransition` component in `src/client/ui/components/page-transition.tsx`, integrated through `PageLayout` so route transitions apply across all pages.
+ Added a shared `AnimatedButton` component in `src/client/ui/components/animated-button.tsx` to reuse Framer Motion tap animations across app buttons.
+ Improved Accessibility: skip to content link, useId() to avoid form field id collisions, and useAnnounce hook for aria-live.
+ Better Error handling: Added second suspense boundary around the content, error-handler middleware for the server, and an centralized error handler for the client.
+ Added a second non-persistent reducer for more transient data.

### Changed

+ **Node.js 24**: Updated engine requirement from Node 22 to Node 24.
+ Make header and footer into reusable components, and a light mode/dark mode toggle.
+ Update the user flow with a proper home page before login.
+ Moved the Login page to a client route.
+ Improved the design of the home page and 404 page.
+ Moved to JWT for session expiration.
+ Updated the ESLint configuration.
+ Updated dependency versions.
+ Changed the favicon.
+ Expanded the .gitignore file.
+ Changed the counter to show an example of useOptimistic.

### Removed

+ EJS template system that is no longer used.
+ Removed the CSS reset. Now provided by Chakra UI.

### Fixed

+ Fixed a bug that prevented it from loading without any saved data. Cold start now working as expected.


## [1.1.0] - 2025-08-14

### Added

+ Cypress for E2E testing
+ Chakra UI design system
+ React Router
+ Added a CHANGELOG
+ Added a .env template
+ Added a css reset
+ Added speculation rules for server-side pages

### Changed

+ Organized the server files for better API construction
+ Updated the versions of dependencies
+ Improved SEO metadata handling

### Removed

+ Historical documentation


## [1.0.1] - 2025-05-25

Frontend

+ Build Tool: Vite
+ Static Typing: TypeScript
+ UI Framework: React
+ State Management: Redux Toolkit

Backend

+ Server Runtime: Node.js
+ Web Framework: Express
+ Template Engine: EJS
+ Authentication Library: Passport.js

Security and Storage

+ Local Storage
+ Crypto Library: Crypto JS

Linting and Formatting

+ Linter: ESLint


## How to Use This Changelog

### For Developers
When making changes, add them to the "Unreleased" section under the appropriate category:
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for security improvements

### For Releases
When creating a new release:
1. Move items from "Unreleased" to a new version section
2. Add the release date
3. Update the version number in package.json
4. Create a git tag for the release

### Version Format
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes (backwards compatible)