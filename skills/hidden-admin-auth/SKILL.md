---
name: hidden-admin-auth
description: Configure the private route as a hidden admin utility and rotate hardcoded default credentials. Moves credentials to .env only; never puts secrets in committed files.
---

# Hidden Admin Auth Setup

Use this skill when you want to keep `/product` as a private admin utility and replace the default `test`/`test` credentials with secure env-driven auth.

## CRITICAL: Security Rules

**Credentials exist ONLY in `.env`.** Never put `admin_username`, `admin_password`, or their hashes in any committed file.

| File | Allowed | Forbidden |
|------|---------|-----------|
| `.env` | User's new credentials (ADMIN_*, CYPRESS_TEST_*) | — |
| `.envTemplate` | Template values: `ADMIN_USERNAME=test` + salt/hash for `test` | User's new username, password, or hashes |
| Code (auth.ts, cypress.config, etc.) | Read from `process.env`; no hardcoded creds | Any credentials |
| Docs (AGENTS.md, README, AUTHENTICATION.md, cypress/README) | Generic text: "configure via .env", "template default: test/test" | Actual username, password, or defaults like admin/pawfect |
| CHANGELOG | Generic: "credentials moved to env vars" | Any credentials or password hints |

## Required Inputs

- `admin_username`: New login username for the admin user.
- `admin_password`: New plaintext password for the admin user.

If either input is missing, pause and ask before editing.

## Goal

1. Move auth to env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH`).
2. Write the user's new credentials to `.env` only.
3. Keep `.envTemplate` with safe template values (`test`/`test`).
4. Update docs generically—never expose the new credentials.

## Files To Update

### 1) `src/server/services/auth.ts`

- Read admin user from `process.env.ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH`.
- If these env vars are set, use them for `verifyUser`. Otherwise fall back to the existing `fakeUser` (test/test) for backwards compatibility.
- Remove or keep `fakeUser` only as fallback when env vars are absent.

### 2) `.env` (user's local file, gitignored)

Add or update:

```
ADMIN_USERNAME=<admin_username>
ADMIN_PASSWORD_SALT=<generated_salt>
ADMIN_PASSWORD_HASH=<generated_hash>
CYPRESS_TEST_USERNAME=<admin_username>
CYPRESS_TEST_PASSWORD=<admin_password>
```

Generate salt/hash using the command in the "Safe Hash Generation" section below. **Only `.env` gets these values.**

### 3) `.envTemplate`

Add the Hidden Admin Auth block **only if it does not exist**. Use these template values:

- `ADMIN_USERNAME=test`
- `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_HASH`: generate for password `test` using the hash command.

Include the regeneration comment so users can generate new values. **Never put the user's new credentials or hashes here.**

### 4) `cypress.config.ts`

Add `env` block:

```ts
env: {
  TEST_USERNAME: process.env.CYPRESS_TEST_USERNAME ?? 'test',
  TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD ?? 'test',
},
```

Defaults must be `test`/`test`. Never use the user's new credentials as defaults.

### 5) `cypress/e2e/auth/login.cy.ts`

Use `Cypress.env('TEST_USERNAME')` and `Cypress.env('TEST_PASSWORD')` instead of hardcoded strings.

### 6) Documentation (generic only)

Update these to describe env-based auth **without exposing credentials**:

- **AGENTS.md** → `Login credentials: configured via .env (ADMIN_* vars). Template default: test/test.`
- **README.md** → `Login with credentials from .env (template default: test/test).`
- **docs/AUTHENTICATION.md** → Describe that credentials come from `.env`; template authenticates as `test`/`test`. Include the regeneration command from `.envTemplate`. Do not mention the user's new credentials.
- **cypress/README.md** → `Credentials are env-driven. Default: test/test. Override via CYPRESS_TEST_USERNAME and CYPRESS_TEST_PASSWORD.`

### 7) Public header (hide login link)

To keep the admin area hidden, remove the login link from the public navigation:

- Update `src/client/ui/layout/header.tsx` so that `PUBLIC_NAV` does **not** include a `nav.login` item.
- Keep the private header and logout link unchanged (`PRIVATE_NAV` stays as-is).
- Users can still reach `/login` directly if they know the URL; it just won't be advertised in the public header.

### 8) CHANGELOG

If adding an entry, use generic text only. Example:

```
### Security
- Hidden admin auth: credentials moved to env vars (ADMIN_USERNAME, ADMIN_PASSWORD_SALT, ADMIN_PASSWORD_HASH). Template default remains test/test.
```

**Never include the new username, password, or any credential values.**

## Safe Hash Generation

```bash
node -e "const c=require('crypto');const p=process.argv[1];const s=c.randomBytes(8).toString('hex');const h=c.pbkdf2Sync(p,s,100000,64,'sha512').toString('hex');console.log('ADMIN_PASSWORD_SALT='+s);console.log('ADMIN_PASSWORD_HASH='+h);" \"<password>\""
```

Use with `test` for `.envTemplate`; use with `admin_password` for `.env` only.

## Validation Checklist

- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`
- [ ] Run `npm run test:e2e` (with `.env` containing the new credentials and CYPRESS_TEST_* set)
- [ ] Verify `.envTemplate` still has `test`/`test`; no user credentials
- [ ] Grep for `admin_password` and the new username—they must not appear in any committed file

## Done Criteria

- Credentials exist only in `.env`.
- `.envTemplate` has safe template values (`test`/`test`).
- Code reads from env; no hardcoded credentials.
- Docs and CHANGELOG are generic; no credentials exposed.
