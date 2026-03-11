---
name: react-hooks
description: Add or refactor client behavior using the project hook decision model (useState, custom hooks, and Redux boundaries).
---

# React Hooks Pattern

Use this skill when implementing new client-side behavior and deciding whether logic belongs in:

- component-local state (`useState` / `useReducer`)
- a reusable custom hook
- Redux global state

## Goal

Keep hooks simple, reusable, and aligned with the project’s local-vs-global state conventions.

## Decision Rules

1. Use `useState` / `useReducer` for local UI state.
2. Extract a custom hook when logic is reused or has non-trivial side effects.
3. Use Redux only for cross-route/shared state or persisted app behavior.

## Files To Update

### 1) Feature component(s)

- Update component logic to use the selected hook strategy.
- Avoid duplicating stateful effect logic across components.

### 2) `src/client/hooks/` (when extracting custom hooks)

- Add a new hook module (`use-*.ts`) with a focused single purpose.
- Keep hook APIs minimal and type-safe.

### 3) `src/client/hooks/README.md` (if introducing a new pattern)

- Document the new hook’s intended use and boundaries.

### 4) Tests and changelog

- Add or update tests at the right layer.
- Update `CHANGELOG.md` (`Unreleased`) for meaningful behavior changes.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run relevant feature tests (or focused Cypress specs when behavior is user-facing)
- Verify no unnecessary Redux usage for local-only state

## Done Criteria

- Hook/state location matches the decision rules.
- Hook logic is reusable where appropriate and not duplicated.
- Tests and docs reflect the final hook approach.
