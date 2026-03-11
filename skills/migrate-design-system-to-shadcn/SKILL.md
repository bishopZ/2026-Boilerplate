---
name: migrate-design-system-to-shadcn
description: Migrate the client UI layer from Chakra UI to shadcn/ui and fully remove Chakra dependencies.
---

# Migrate Design System to shadcn/ui

Use this skill when replacing Chakra UI with shadcn/ui as the primary component system.

## Goal

Adopt shadcn/ui for component primitives and styling, and completely remove Chakra UI from the repository.

## Hard Requirement

At completion, no Chakra runtime or Chakra-specific code should remain:

- no `@chakra-ui/*` dependencies
- no Chakra providers/components/hooks
- no Chakra-specific imports in client code

## Files To Update

### 1) Dependencies (`package.json`)

- Add shadcn prerequisites (typically Tailwind CSS + required utility libs).
- Install selected shadcn component dependencies.
- Remove Chakra packages:
  - `@chakra-ui/react`
  - `@emotion/react`
  - `@emotion/styled`
  - any Chakra-only addons

### 2) App/provider bootstrap

- Replace Chakra provider setup in `src/client/main.tsx`.
- Keep existing Redux, i18n, and theme responsibilities functioning after migration.

### 3) Component migration

- Replace components in:
  - `src/client/ui/components/`
  - `src/client/ui/layout/`
  - `src/client/pages/`
- Preserve accessibility semantics, focus states, and keyboard interactions.
- Keep route behavior and existing feature logic unchanged.

### 4) Styling system migration

- Introduce shadcn-compatible global styling strategy.
- Move Chakra prop-based styles to className/utility-driven styles.
- Keep dark/light mode behavior equivalent (or document differences explicitly).

### 5) Docs and guidance

- Update docs where Chakra is referenced:
  - `README.md`
  - `AGENTS.md`
  - `docs/ARCHITECTURE.md`
  - `docs/TECHNOLOGY.md`
- Add `CHANGELOG.md` entry in `Unreleased`.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run focused E2E tests for primary UI flows:
  - `cypress/e2e/auth/login.cy.ts`
  - `cypress/e2e/accessibility/skip-link.cy.ts`
  - `cypress/e2e/layout/footer-position.cy.ts`
- Verify Chakra is fully removed:
  - `rg \"@chakra-ui|Chakra|chakra\" src package.json docs AGENTS.md`

## Done Criteria

- shadcn/ui is the active design system.
- Chakra dependencies and imports are removed.
- Core user flows and accessibility behavior still work.
- Documentation and changelog reflect the migration clearly.
