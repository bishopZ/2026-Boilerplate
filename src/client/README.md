# Client

The React frontend for 2026 Boilerplate.

Cursor rule reference: [`.cursor/rules/react-components.mdc`](../../../.cursor/rules/react-components.mdc)

## Entry

**main.tsx** — Bootstraps the app with providers (Chakra UI, ColorMode, Redux, I18nProvider) and an ErrorBoundary. Renders `App` inside the provider tree.

## Routing

**App.tsx** — Defines routes via React Router. Most page components are lazy-loaded (`React.lazy`) for smaller initial bundle. Includes `ScrollToTop`, route-level `Suspense` + React 19 `Activity` fallback handling, and preferences initialization on mount.

## Layout

**ui/layout/** — `PageLayout` wraps each page with `SkipLink`, `Header` (public or private variant), main content area, and `Footer`. `PageTransition` provides route transition animations.

## Error/Latency Boundaries

- App-level boundary: `main.tsx`
- Route-level loading boundary: `App.tsx`
- Feature-level boundaries: colocate with independently-failing/loading sections

See `docs/ARCHITECTURE.md` for the canonical boundary strategy.

## State

**redux/** — Redux Toolkit store with `preferences` (persisted) and `app` (non-persisted) slices. Persistence is handled by middleware that encrypts and writes to localStorage. See [redux/README.md](./redux/README.md) for details.

## UI

**ui/** — Reusable components: `PageMeta`, `AnimatedButton`, `ErrorPage`, `LoadingSpinner`, `SkipLink`, `LanguageSwitcher`, `ColorModeToggle`, etc. Chakra UI is used for all layout and styling.

## Hooks

**hooks/** — Custom React hooks (e.g. `useAnnounce` for aria-live announcements). See [hooks/README.md](./hooks/README.md) for the decision guide on useState vs custom hook vs Redux.

## Locales

**locales/** — JSON files (en.json, ar.json, fr.json, zh.json) for react-intl. The `I18nProvider` reads locale from Redux preferences and provides messages to the app. See [docs/I18N.md](../../docs/I18N.md).

## Utilities

**utilities/** — Client-only helpers: encryption, constants, i18n provider, error reporting, formatting, CSRF, type helpers.
