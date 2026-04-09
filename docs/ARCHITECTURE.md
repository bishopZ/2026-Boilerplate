# Architecture

## Overview

2026 Boilerplate is a full-stack TypeScript web application with a React frontend and Express backend served together via `vite-express`. There is no database by default — authentication uses a local starter account (`AUTH_PROFILE=local`) and state persists to encrypted `localStorage`.

## System Diagram

```
Browser
  │
  ├── React SPA (Vite HMR in dev)
  │     ├── Pages (lazy-loaded via React Router)
  │     ├── Redux Store (preferences, app slices)
  │     │     └── Persistence Middleware → Encrypted localStorage
  │     ├── Feature Flags (env defaults + runtime overrides via hook)
  │     └── Chakra UI Components
  │
  └── HTTP requests
        │
        ▼
Express Server (vite-express)
  ├── Auth Routes (/api/session + legacy /login/password, /logout) → Passport.js LocalStrategy
  ├── API Routes (/api/key) → Returns encryption key
  ├── Request ID + Structured Logging Middleware
  ├── Redirect Rules (legacy paths) → Config-driven HTTP redirects
  ├── Page Routes (/, /login, /product, etc.) → Served by Vite
  └── Static Routes (/sitemap.xml)
```

## Directory Structure

```
src/
├── client/                   # Frontend (React SPA)
│   ├── main.tsx              # Entry: providers (Chakra, Redux, I18n, ErrorBoundary)
│   ├── App.tsx               # Route definitions, preferences initialization
│   ├── hooks/                # Custom React hooks
│   ├── locales/              # Language translation files
│   ├── pages/                # Route page components
│   ├── redux/                # Redux slices, store, persistence middleware
│   ├── ui/                   # Reusable UI components
│   └── utilities/            # Client-only utilities (encryption, constants)
│
└── server/                   # Backend (Express)
    ├── main.ts               # Entry: Express app, middleware, routes, vite-express
    ├── config/               # Constants and API error helpers
    ├── controllers/          # Request handlers
    ├── middleware/           # Auth middleware
    ├── routes/               # Route definitions
    └── services/             # Business logic (auth verification)
```

## Key Patterns

### Authentication Flow

1. API clients submit credentials to `POST /api/session` (preferred REST path); browser forms can still use `POST /login/password`
2. Passport.js `LocalStrategy` verifies credentials using the selected `AUTH_PROFILE`
3. On success: JWT cookie (`token`) is set (`201` for REST, redirect for legacy browser form flow)
4. On failure: REST endpoint returns `401`; legacy form endpoint redirects to `/login`
5. Protected routes use `ensureAuthenticated` middleware

### Auth backing profiles

`AUTH_PROFILE` supports starter modes for:

- `local` (default)
- `supabase` (starter integration path)
- `postgres` (starter integration path)

### State Persistence Flow

1. On app load, `initPreferences` async thunk fetches encryption key from `/api/key`
2. If authenticated, the key is returned and used to decrypt `localStorage`
3. On every Redux action, the persistence middleware encrypts and saves specified slices
4. The persistence middleware in `store.ts` is reusable — add persistence registrations for slices, don't create new middleware

### Feature Flag Flow

1. Env defaults are parsed from `VITE_FEATURE_FLAGS`
2. Runtime overrides are stored in `app.featureFlagOverrides`
3. `useFeatureFlag(flagName)` resolves runtime override first, env default second

### UI failure/latency boundaries

- App-level catastrophic failure handling is managed by `ErrorBoundary` in `src/client/main.tsx`.
- Route-level latency is managed by `Suspense` around lazy routes in `src/client/App.tsx`.
- Feature-level failures should use local boundaries when one section can fail independently (example: product counter actions).
- Feature-level latency should use local `Suspense` only for independently-loading sections, not whole-page wrappers.
- Use React 19 `Activity` around loading fallback UI when representing active pending work.

### Observability

- Every request gets an `x-request-id` (propagated if provided, generated otherwise).
- Structured JSON request logs capture method/path/status/duration/requestId.
- Error logs include request context via global error middleware.
- Auth flows emit audit hooks (login/session/logout/rate-limit events).

Implementation is grouped in **`src/server/observability/`** (logger, request-ID and request-completion middleware, audit helpers). Cross-cutting middleware such as the global error handler stays in `src/server/middleware/` and imports the pack.

### Client/Server Code Separation

The client uses `src/client/utilities/` for browser-specific helpers. Server business logic lives in `src/server/services/` and `src/server/config/`; shared structured logging and request correlation live in `src/server/observability/`. Keep client-only and server-only modules separated to avoid accidental cross-runtime imports.

## Technology Choices

| Layer | Choice | Why |
|---|---|---|
| Build | Vite | Fast HMR, ESM-native, simple config |
| Frontend | React 19 | Document metadata, hooks, Suspense |
| State | Redux Toolkit | DevTools, middleware, battle-tested at scale |
| Routing | React Router | Lazy loading, client-side navigation |
| UI | Chakra UI | Accessible, composable, good TypeScript support |
| Backend | Express 5 | Flexible, mature, large ecosystem |
| Auth | Passport.js | Strategy-based, extensible |
| Encryption | Native Web Crypto API | AES-GCM encryption for localStorage |
| Testing | Cypress | E2E testing with interactive runner |
| Linting | ESLint | Custom config with TypeScript + React rules |
