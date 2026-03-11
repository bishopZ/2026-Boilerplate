# Contributing

We welcome contributions! Here's how to get started:

1. **Select an issue**: Browse the [Github issues page](https://github.com/bishopZ/2026-Boilerplate/issues) and select an issue you'd like to work on.
2. **Create a branch**: Create a new branch named after the issue number, such as `issue-17` (replace `17` with the actual issue number).
3. **Make your changes**: Implement the changes needed to address the issue.
4. **Create a pull request**: Submit a pull request with your changes, referencing the issue number in the description.

Before submitting your pull request, make sure to:

- Run `npm run test` to ensure code quality, verify TypeScript types, and run the E2E tests.
- Run `npm run test:unit` during development for fast logic-level feedback before full E2E validation.
- Run `npm run check:i18n` when your change adds/updates message ids and you are keeping locale files fully in sync.
- Test your changes locally with `npm run dev`

## Testing guidance for contributors and agents

- Add at least one automated test for each feature change at the right level:
  - unit/integration tests for feature-local logic
  - E2E tests for user-critical cross-page journeys
- Keep the baseline Cypress suite small and representative so it stays easy to migrate to other frameworks.
- Prefer updating existing E2E contract specs (`auth`, `accessibility`, `i18n`, `seo`) before adding many new E2E files.
- If a change needs to exceed the E2E soft cap, include a short rationale in the PR description.
