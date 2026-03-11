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

## generate-skills-index.mjs

Invoked via `npm run gen:skills-index`.

Synchronizes skill references in:

- `AGENTS.md`
- `README.md`

It reads all `skills/*/SKILL.md` files, extracts each frontmatter `description`, and rewrites the sections between:

- `<!-- SKILLS_INDEX_START -->`
- `<!-- SKILLS_INDEX_END -->`

**When to run:** After adding/removing/updating skills or editing a skill description.
