---
name: add-form-manager
description: Introduce React Hook Form + Zod for form state, validation, and typed submission flows.
---

# Add Form Manager (React Hook Form + Zod)

Use this skill when adding or migrating forms to a standardized form-management layer.

## Goal

Adopt React Hook Form + Zod so form validation is declarative, typed, reusable, and easier to test.

## Scope Guidance

- Current baseline form in this repo: `src/client/pages/Login.tsx`.
- Start by migrating one form end-to-end before expanding to additional forms.
- Keep UX and route behavior unchanged during migration.

## Files To Update

### 1) Dependencies (`package.json`)

- Add:
  - `react-hook-form`
  - `zod`
  - `@hookform/resolvers`

### 2) Form schema and types

- Create colocated schema module (example: `src/client/pages/login-schema.ts`) or shared `src/client/utilities/validation/`.
- Define a `z.object()` schema and infer TS type from it.
- Keep field names aligned with backend expectations (`username`, `password`, etc.).

### 3) UI integration

- Replace uncontrolled form handling with `useForm`.
- Use `zodResolver` for validation.
- Surface field-level error messages with accessible Chakra UI patterns.
- Keep submit action compatible with existing auth flow unless migration explicitly changes transport.

### 4) Reusable form primitives (recommended)

- If multiple forms are expected, extract reusable wrappers:
  - input + label + error
  - submit state handling
  - validation message formatting

### 5) Documentation and changelog

- Update docs/README sections that describe form patterns.
- Add an `Unreleased` entry in `CHANGELOG.md`.

## Validation Checklist

- Run `npm run lint`
- Run `npm run type-check`
- Run auth-focused E2E tests after login form migration:
  - `npm run test:e2e -- --spec cypress/e2e/auth/login.cy.ts`
- Verify keyboard navigation and error messaging remain accessible

## Done Criteria

- React Hook Form + Zod are integrated and typed.
- Login form (or targeted form) is migrated without behavior regression.
- Validation and error rendering are centralized and maintainable.
- Docs/changelog are updated to reflect the new form pattern.
