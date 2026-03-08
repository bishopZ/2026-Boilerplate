---
name: hidden-admin-auth
description: Use this skill when keeping the private route as a hidden admin utility and rotating the hardcoded default login to a new username/password in a secure, repeatable way.
---

# Hidden Admin Auth Setup

Use this skill when you want to keep `/product` as a private admin utility and replace the default hardcoded credentials.

## Required Inputs

- `admin_username`: New login username/email for the hardcoded admin user.
- `admin_password`: New plaintext password for the hardcoded admin user.

If either input is missing, pause and ask for it before editing files.

## Goal

Replace the default `test`/`test` hardcoded account with secure credentials while keeping JWT + cookie-based auth behavior unchanged.

## Files To Update

### 1) `src/server/services/auth.ts`

- Replace `fakeUser.email` with `admin_username`.
- Generate a new random salt.
- Hash `admin_password` using PBKDF2 with existing constants (`ITERATIONS`, `KEY_LENGTH`, `DIGEST`).
- Replace `fakeUser.salt` and `fakeUser.password` with the generated values.

Do not change hashing parameters/constants unless explicitly requested.

### 2) `AGENTS.md`

- Update the testing login credentials under `## Testing` so future agents use the new username/password.

### 3) Auth documentation

- Update `docs/AUTHENTICATION.md` default user section so docs match the new configured credentials.

### 4) E2E tests (if needed)

- If tests rely on hardcoded `test`/`test` credentials (e.g. auth Cypress specs), update them to use the new credentials.

## Safe Hash Generation

Use this command to generate salt + hash:

`node -e "const crypto=require('crypto'); const password=process.argv[1]; const iterations=100000; const keyLen=64; const digest='sha512'; const salt=crypto.randomBytes(8).toString('hex'); const hash=crypto.pbkdf2Sync(password,salt,iterations,keyLen,digest).toString('hex'); console.log(JSON.stringify({salt,hash},null,2));" \"<admin_password>\"`

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run `npm run test:e2e` (or at minimum login-focused auth test)
- Verify login with `admin_username`/`admin_password` succeeds and wrong credentials fail.

## Done Criteria

- Default hardcoded user credentials are rotated.
- Tests/docs that mention credentials are aligned.
- JWT login flow and protected route behavior remain intact.
