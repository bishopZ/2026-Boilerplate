---
name: hidden-admin-auth
description: Configure the private route as a hidden admin utility. Moves credentials to env vars; operator updates .env using .envTemplate instructions. No credentials passed to the skill.
---

# Hidden Admin Auth Setup

Use this skill when you want to keep `/product` as a private admin utility. It sets up env-driven auth; the operator rotates credentials by updating `.env` using instructions in `.envTemplate`.

## CRITICAL: Security Rules

**Credentials exist ONLY in `.env`.** The skill never receives or writes credentials. It sets up infrastructure; the operator updates `.env` themselves using instructions in `.envTemplate`.

| File | Allowed | Forbidden |
|------|---------|-----------|
| `.env` | Operator updates manually (gitignored) | Skill does not modify |
| `.envTemplate` | Template values: `ADMIN_USERNAME=test` + salt/hash for `test` | Any real credentials |
| Code (auth.ts, cypress.config, etc.) | Read from `process.env`; no hardcoded creds | Any credentials |
| Docs (AGENTS.md, README, AUTHENTICATION.md, cypress/README) | Generic text: "configure via .env", "template default: test/test" | Actual credentials or password hints |
| CHANGELOG | Generic: "credentials moved to env vars" | Any credentials or password hints |

## Goal

1. Move auth to env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH`).
2. Add `.envTemplate` with safe template values (`test`/`test`) and instructions for the operator to update `.env`.
3. Remove the login link from the public header.
4. Update docs generically—never expose credentials.

## Files To Update

### 1) `src/server/services/auth.ts`

- Read admin user from `process.env.ADMIN_USERNAME`, `ADMIN_PASSWORD_SALT`, `ADMIN_PASSWORD_HASH`.
- If these env vars are set, use them for `verifyUser`. Otherwise fall back to the existing `fakeUser` (test/test) for backwards compatibility.
- Remove or keep `fakeUser` only as fallback when env vars are absent.

### 2) `.envTemplate`

Add the Hidden Admin Auth block **only if it does not exist**. Use these template values:

- `ADMIN_USERNAME=test`
- `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_HASH`: generate for password `test` using the hash command.
- Optional: `CYPRESS_TEST_USERNAME` and `CYPRESS_TEST_PASSWORD` (for E2E when credentials differ from template; defaults to `test`/`test`).

Include the regeneration command as a comment so the operator can generate new values and paste them into `.env`. **Never put real credentials in `.envTemplate`.**

### 3) `cypress.config.ts`

Add `env` block:

```ts
env: {
  TEST_USERNAME: process.env.CYPRESS_TEST_USERNAME ?? 'test',
  TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD ?? 'test',
},
```

Defaults must be `test`/`test`.

### 4) `cypress/e2e/auth/login.cy.ts`

Use `Cypress.env('TEST_USERNAME')` and `Cypress.env('TEST_PASSWORD')` instead of hardcoded strings.

### 5) Documentation (generic only)

Update these to describe env-based auth **without exposing credentials**:

- **AGENTS.md** → `Login credentials: configured via .env (ADMIN_* vars). Template default: test/test.`
- **README.md** → `Login with credentials from .env (template default: test/test).`
- **docs/AUTHENTICATION.md** → Describe that credentials come from `.env`; template authenticates as `test`/`test`. Include the regeneration command. Do not mention specific credentials.
- **cypress/README.md** → `Credentials are env-driven. Default: test/test. Override via CYPRESS_TEST_USERNAME and CYPRESS_TEST_PASSWORD.`

### 6) Public header (hide login link)

To keep the admin area hidden, remove the login link from the public navigation:

- Update `src/client/ui/layout/header.tsx` so that `PUBLIC_NAV` does **not** include a `nav.login` item.
- Keep the private header and logout link unchanged (`PRIVATE_NAV` stays as-is).
- Users can still reach `/login` directly if they know the URL; it just won't be advertised in the public header.

### 7) CHANGELOG

If adding an entry, use generic text only. Example:

```
### Security
- Hidden admin auth: credentials moved to env vars (ADMIN_USERNAME, ADMIN_PASSWORD_SALT, ADMIN_PASSWORD_HASH). Template default remains test/test.
```

**Never include credentials in the CHANGELOG.**

## Safe Hash Generation

Include this command in `.envTemplate` so the operator can generate values for their `.env`:

```bash
node -e "const c=require('crypto');const p=process.argv[1];const s=c.randomBytes(8).toString('hex');const h=c.pbkdf2Sync(p,s,100000,64,'sha512').toString('hex');console.log('ADMIN_PASSWORD_SALT='+s);console.log('ADMIN_PASSWORD_HASH='+h);" \"<your_password>\""
```

Use with `test` when generating the template values for `.envTemplate`. The operator runs it with their chosen password for `.env`.

## Validation Checklist

- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`
- [ ] Run `npm run test:e2e` (dev server uses `.env` or falls back to test/test)
- [ ] Verify `.envTemplate` has only `test`/`test`; no real credentials

## Done Criteria

- Credentials exist only in `.env`.
- `.envTemplate` has safe template values (`test`/`test`).
- Code reads from env; no hardcoded credentials.
- Docs and CHANGELOG are generic; no credentials exposed.
