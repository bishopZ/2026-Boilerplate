# Skill: Rebrand

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
- `<meta property="og:site_name">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta name="twitter:title">`
- `<meta name="twitter:description">`
- `<meta name="apple-mobile-web-app-title">`

### 2) `package.json`

Update package metadata:
- `name`: kebab-case package name that matches the new project title.
- `description`: use `site_description`.

### 3) `README.md`

Update the README so it no longer reads as a boilerplate identity.
- Replace the H1 title with the new project title.
- Replace the short description under the H1 with `site_description`.
- Update opening paragraphs that still brand the repo as "2026 Boilerplate" so they describe the new project.

## Validation Checklist

- Run `rg "2026 Boilerplate|2026-boilerplate" index.html package.json README.md` and verify old branding is removed from these files unless intentionally preserved.
- Run `rg "<new site title>|<new site description>" index.html package.json README.md` to confirm the new branding is present.
- Confirm JSON formatting in `package.json` remains valid.

## Done Criteria

- `index.html`, `package.json`, and `README.md` all reflect `site_title` and `site_description`.
- Project metadata no longer presents itself as the generic boilerplate identity in those files.
