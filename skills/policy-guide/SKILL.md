---
name: policy-guide
description: Update the combined policy-writing guide page and keep linked routes, metadata, tests, and docs in sync.
---

# Policy Guide Updates

Use this skill when changing legal-policy guidance content in the app.

## Goal

Maintain one shared page that explains how to author real Terms of Service and Privacy Policy documents for a production deployment.

## Files To Update

### 1) `src/client/pages/Policies.tsx`

- Update instructional content and section structure.
- Keep the page implementation focused on guidance, not fake legal copy.
- Keep `PageMeta` title/description aligned to content changes.

### 2) Routing and links

- `src/client/App.tsx` — Ensure `/policies` route renders the guide.
- `src/client/ui/layout/footer.tsx` — Keep footer link pointing to `/policies`.
- If legacy URLs are retained (`/privacy`, `/terms`), verify they redirect to `/policies`.

### 3) Locale files

- If visible labels change, update all locale JSON files in `src/client/locales/`.

### 4) Sitemap and SEO tests

- `src/server/controllers/sitemap.ts` — Ensure sitemap references `/policies`.
- `cypress/e2e/seo/page-meta.cy.ts` — Keep metadata assertions in sync.

### 5) Changelog

- Add an `Unreleased` entry for major policy-guide updates.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run `npm run test:e2e -- --spec cypress/e2e/seo/page-meta.cy.ts`
- Verify footer link and legacy routes resolve to `/policies`

## Done Criteria

- App contains one policy guidance page (`/policies`).
- Footer and sitemap point to the combined page.
- Metadata + E2E coverage reflect the updated content.
