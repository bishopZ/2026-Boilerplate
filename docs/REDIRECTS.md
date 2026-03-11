# Redirects

Use redirects when an old URL should continue working after a page move or route rename.

## Where redirects live

- Redirect rules are centralized in `src/server/config/redirects.ts`.
- Page routing middleware in `src/server/routes/pages.ts` applies those rules before page handling.

## Current behavior

- Redirects preserve query strings.
- Redirect status codes are explicit per rule (`301`, `302`, `307`, `308`).
- Legacy aliases currently included:
  - `/privacy` → `/policies` (`301`)
  - `/terms` → `/policies` (`301`)

## Adding a redirect

1. Add a new rule object to `REDIRECT_RULES` in `src/server/config/redirects.ts`.
2. Choose the correct status code:
   - `301`: permanent move (SEO-friendly for stable changes)
   - `302`: temporary move
   - `307`/`308`: preserve HTTP method for non-GET cases
3. Add or update E2E coverage in `cypress/e2e/routing/redirects.cy.ts`.
4. Update `CHANGELOG.md` (`Unreleased`).

## Agent workflow

Use `skills/add-redirect/SKILL.md` for a repeatable SOP when implementing new redirects.
