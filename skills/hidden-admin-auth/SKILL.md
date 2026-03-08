---
name: hidden-admin-auth
description: Use this skill when converting the private route into a hidden admin utility backed by env-managed admin credentials (no credentials committed in source).
---

# Hidden Admin Auth Setup

Use this skill when you want to keep `/product` as a private admin utility and move admin credentials out of source code into environment variables.

## Required Inputs

- `admin_username`: New login username/email for the hardcoded admin user.
- `admin_password`: New plaintext password for the hardcoded admin user.

If either input is missing, pause and ask for it before editing files.

## Goal

Convert auth from a hardcoded example user to a valid env-backed admin user while keeping JWT + cookie-based auth behavior unchanged.

No credential values should be committed in TypeScript source files.

## Files To Update

### 1) `src/server/services/auth.ts`

- Remove hardcoded credential values from source.
- Replace hardcoded user object usage with an env-backed admin config loader.
- Read username, salt, and password hash from env vars (see next section).
- Keep `verifyUser()` logic intact (username comparison + PBKDF2 hash verification).
- Rename identifiers away from `fake*` naming (for example: `adminUserFromEnv`).

Do not change PBKDF2 parameters/constants unless explicitly requested.

### 2) `.envTemplate` (and local `.env`)

Add explicit admin auth env vars:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_SALT`
- `ADMIN_PASSWORD_HASH`

`ADMIN_PASSWORD_HASH` must be generated from `ADMIN_PASSWORD_SALT` + plaintext password using existing PBKDF2 parameters.

### 3) Documentation and test guidance

- Update `docs/AUTHENTICATION.md` hidden-admin section to point to env-backed credentials (not source edits).
- Update agent/docs references that currently imply fixed literal login credentials; they should point to `.env` values for hidden-admin setup.
- If tests still rely on hardcoded `test` / `test`, switch them to env-driven values where appropriate.

## Safe Hash Generation

Use this command to generate salt + hash from plaintext password:

`node -e "const crypto=require('crypto'); const password=process.argv[1]; const iterations=100000; const keyLen=64; const digest='sha512'; const salt=crypto.randomBytes(8).toString('hex'); const hash=crypto.pbkdf2Sync(password,salt,iterations,keyLen,digest).toString('hex'); console.log(JSON.stringify({salt,hash},null,2));" \"<admin_password>\"`

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run `npm run test:e2e` (or at minimum login-focused auth test)
- Verify login with env-configured `admin_username`/`admin_password` succeeds and wrong credentials fail.

## Done Criteria

- No credential values are hardcoded in source files.
- Admin credential source of truth is `.env` / `.envTemplate`.
- Tests/docs that mention credentials point to env-based configuration.
- JWT login flow and protected route behavior remain intact.
