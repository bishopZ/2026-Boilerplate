# Architecture

## Overview

2026 Boilerplate is a full-stack TypeScript web application with a React frontend and Express backend served together via `vite-express`. There is no database — authentication uses a hardcoded test user and state persists to encrypted `localStorage`.

## System Diagram

```
Browser
  │
  ├── React SPA (Vite HMR in dev)
  │     ├── Pages (lazy-loaded via React Router)
  │     ├── Redux Store (player, game slices)
  │     │     └── Persistence Middleware → Encrypted localStorage
  │     └── Chakra UI Components
  │
  └── HTTP requests
        │
        ▼
Express Server (vite-express)
  ├── Auth Routes (/login/password, /logout) → Passport.js LocalStrategy
  ├── API Routes (/api/key) → Returns encryption key
  ├── Page Routes (/, /login, /product) → Served by Vite
  └── Static Routes (/sitemap.xml)
```

## Directory Structure

```
src/
├── client/                    # Frontend (React SPA)
│   ├── main.tsx              # Entry: providers (Chakra, Redux, Router, ErrorBoundary)
│   ├── App.tsx               # Route definitions, player initialization
│   ├── components/
│   │   ├── data/             # Redux slices, store, persistence middleware
│   │   ├── layout/           # Header, Footer
│   │   └── ui/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Route page components
│   ├── shared/               # Client-only utilities (encryption, constants)
│   └── styles/               # CSS
│
└── server/                   # Backend (Express)
    ├── main.ts               # Entry: Express app, middleware, routes, vite-express
    ├── config/               # Session config, constants
    ├── controllers/          # Request handlers
    ├── middleware/            # Auth middleware
    ├── routes/               # Route definitions
    ├── services/             # Business logic (auth verification)
    └── shared/               # Server-only constants
```

## Key Patterns

### Authentication Flow

1. User submits credentials to `POST /login/password`
2. Passport.js `LocalStrategy` verifies against the hardcoded user
3. On success: session created, redirect to `/product`
4. On failure: redirect back to `/login`
5. Protected routes use `ensureAuthenticated` middleware

### State Persistence Flow

1. On app load, `initPlayer` async thunk fetches encryption key from `/api/key`
2. If authenticated, the key is returned and used to decrypt `localStorage`
3. On every Redux action, the persistence middleware encrypts and saves specified slices
4. The `createPersistMiddleware` factory in `persistence.ts` is reusable for any slice

### Client/Server Code Separation

Client and server each have their own `shared/` directory. Code is intentionally duplicated rather than shared, because Vite's bundler and the Node.js runtime have different module resolution requirements.

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
| Encryption | CryptoJS | AES encryption for localStorage |
| Testing | Cypress | E2E testing with interactive runner |
| Linting | ESLint | Custom config with TypeScript + React rules |
