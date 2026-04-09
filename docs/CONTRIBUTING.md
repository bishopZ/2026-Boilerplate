# Contributing

We welcome contributions! Here's how to get started:

1. **Select an issue**: Browse the [Github issues page](https://github.com/bishopZ/2026-Boilerplate/issues) and select an issue you'd like to work on.
2. **Create a branch**: Create a new branch named after the issue number, such as `issue-17` (replace `17` with the actual issue number).
3. **Make your changes**: Implement the changes needed to address the issue.
4. **Create a pull request**: Submit a pull request with your changes, referencing the issue number in the description.

Before submitting your pull request, make sure to:

- Run `npm run test` to ensure code quality, verify TypeScript types, and run the E2E tests (the same checks run in GitHub Actions on PRs and pushes to `main`; see **GitHub Actions CI** in the root `README.md`).
- Run `npm run check:i18n` when your change adds/updates message ids and you are keeping locale files fully in sync.
- Test your changes locally with `npm run dev`

## Testing guidance for contributors and agents

- Add at least one automated test for each feature change at the right level:
  - unit/integration for local logic
  - E2E for cross-page, user-critical journeys
- Keep the baseline Cypress suite small and representative so it stays easy to migrate to other frameworks.
- Prefer updating existing E2E contract specs (`auth`, `accessibility`, `i18n`, `seo`) before adding many new E2E files.

## React 19 boundary guidance (loading + failures)

Use boundary placement by latency domain (`Suspense`) and failure domain (`ErrorBoundary`):

- Route-level loading boundaries
- Feature-level loading/failure boundaries where sections are independent
- App-level catastrophic error boundary

Canonical guidance lives in `docs/ARCHITECTURE.md` (UI failure/latency boundaries section).
