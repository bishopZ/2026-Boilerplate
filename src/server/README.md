# Server

The Express backend for 2026 Boilerplate. Served alongside the Vite-built client via vite-express.

Cursor rule reference: [`.cursor/rules/server-patterns.mdc`](../../.cursor/rules/server-patterns.mdc)

## Entry

**main.ts** — Creates the Express app, attaches middleware and routes, then starts the server with `ViteExpress.listen`. In development, Vite serves the client with HMR; in production, built assets are served from `dist/`.

## Structure

Follows an MVC-style layout:

- **routes/** — Route definitions. Auth routes (login/logout), API routes (e.g. `/api/key`), page routes (pass-through to Vite or serve sitemap).
- **controllers/** — Request handlers. Call services and send responses.
- **services/** — Business logic (auth verification, JWT, etc.).
- **middleware/** — Auth (`ensureAuthenticated`), CSRF, global error handler.
- **config/** — Constants, API paths, session config.

## Key Flows

- **Auth:** POST to login, Passport LocalStrategy verifies against hardcoded user, JWT is set in an `httpOnly` cookie.
- **API key:** Authenticated GET `/api/key` returns encryption key for client-side localStorage.
- **Pages:** Most routes pass through to Vite; protected routes use `ensureAuthenticated` before passing.

See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for the full system diagram and [docs/AUTHENTICATION.md](../../docs/AUTHENTICATION.md) for auth details and migration options.
