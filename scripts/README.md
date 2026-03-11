# Scripts

Project scripts live in this folder and are invoked via npm scripts.

This file documents script implementation details in `scripts/`.
For the full npm command reference and usage workflows, see [`docs/SCRIPTS.md`](../docs/SCRIPTS.md).

## check-i18n-keys.mjs

Invoked via `npm run check:i18n`.

Part of the [i18n system](../docs/I18N.md). Validates that i18n locale files stay in sync:

1. **Key parity:** Ensures `src/client/locales/en.json`, `ar.json`, and `fr.json` have identical key sets. No locale may have missing or extra keys compared to the base (en).

2. **Used ids exist:** Scans all `.ts` and `.tsx` files under `src/client` for:
   - `<FormattedMessage id="..."` and `id={'...'}`
   - `formatMessage({ id: '...' })`
   - `labelId: '...'`

On success, prints a confirmation. On failure, prints which keys are missing or extra and exits with code 1.

**When to run:** Only if using option 3 (full translation). Before committing when you add or change UI strings.

## validate-skills.mjs

Invoked via `npm run check:skills`.

Validates required skill quality and writes a report to:

- `docs/SKILLS_VALIDATION.md`

Checks include:

1. Required skill files exist.
2. Frontmatter has `name` and `description`.
3. Core headings exist (`Goal`, `Files To Update`, `Validation Checklist`, `Done Criteria`).
4. Referenced file paths are valid (with support for planned-to-create files).

**When to run:** Before committing skill updates and during periodic skill audits.
