---
name: rebrand
description: Use this immediately after cloning the boilerplate to convert it into a new project identity. Trigger whenever a developer provides a new site title/description and wants boilerplate branding removed from centralized metadata (`PageMeta`), docs, and shared public/private header branding.
---

# Rebrand

Use this skill when a developer has cloned the boilerplate and wants to turn it into their own project identity.

## Required Inputs

- `site_title`: The new project/site name shown to users.
- `site_description`: A short project summary used in metadata and docs.

If either input is missing, pause and ask for it before editing files.

## Goal

Replace boilerplate branding so the project is clearly the developer's new project.

## Files To Update

### 1) `index.html`

Update title/description branding in metadata to use the new values.

Required replacements:
- `<title>`
- `<meta name="title">`
- `<meta name="description">`

### 2) `src/client/utilities/constants.ts`

Update centralized metadata constants used by `PageMeta`:
- Any boilerplate-specific values (author, preview image URL, social handle, keywords, fallback canonical host, locale, and mobile meta defaults) that should change for the new project.

### 3) `src/client/ui/page-meta.tsx`

Confirm `PageMeta` still receives `title` and `description` and maps them to the full metadata set using React 19 metadata tags (`<title>`, `<meta>`, `<link rel="canonical">`).

### 4) Page metadata calls

Update page-level `PageMeta` calls in:
- `src/client/pages/Home.tsx`
- `src/client/pages/About.tsx`
- `src/client/pages/Login.tsx`
- `src/client/pages/Product.tsx`
- `src/client/pages/Privacy.tsx`
- `src/client/pages/Terms.tsx`
- `src/client/pages/NotFound.tsx`

Required replacements:
- Page title values passed to `title`.
- Page description values passed to `description`.

### 5) `package.json`

Update package metadata:
- `name`: kebab-case package name that matches the new project title.
- `description`: use `site_description`.

### 6) `README.md`

Update the README so it no longer reads as a boilerplate identity.
- Replace the H1 title with the new project title.
- Replace the short description under the H1 with `site_description`.
- Update opening paragraphs that still brand the repo as "2026 Boilerplate" so they describe the new project.

### 7) Public and private header files

Update the client header branding in:
- `src/client/ui/layout/header.tsx`

Required replacement:
- Visible app title text used by both `PublicHeader` and `PrivateHeader` (currently rendered from the shared `Header` component).

## Validation Checklist

- Run `rg "2026 Boilerplate|2026-boilerplate" index.html package.json README.md src/client/ui/layout/header.tsx src/client/utilities/constants.ts src/client/ui/page-meta.tsx src/client/pages` and verify old branding is removed from these files unless intentionally preserved.
- Run `rg "<new site title>|<new site description>" index.html package.json README.md src/client/ui/layout/header.tsx src/client/utilities/constants.ts src/client/ui/page-meta.tsx src/client/pages` to confirm the new branding is present.
- Confirm JSON formatting in `package.json` remains valid.

## Done Criteria

- `index.html`, `src/client/utilities/constants.ts`, `src/client/ui/page-meta.tsx`, page-level `PageMeta` calls, `package.json`, `README.md`, and `src/client/ui/layout/header.tsx` reflect the rebrand inputs where applicable.
- Project metadata no longer presents itself as the generic boilerplate identity in those files.
