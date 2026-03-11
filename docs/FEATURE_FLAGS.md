# Feature Flags

This project includes a starter feature-flag pattern with:

- env-based defaults (`VITE_FEATURE_FLAGS`)
- runtime overrides via Redux
- a reusable React hook (`useFeatureFlag`)

## Env defaults

Set `VITE_FEATURE_FLAGS` in `.env` as a comma-separated list:

- `flagName=true`
- `anotherFlag=false`

Example:

- `VITE_FEATURE_FLAGS="newNav=true,newCheckout=false"`

Truthy values: `1`, `true`, `on`, `yes` (case-insensitive).  
Any other value is treated as `false`.

## Runtime hook

Use the hook in client components:

- `useFeatureFlag('newNav')` returns:
  - `enabled`
  - `setOverride(boolean)`
  - `clearOverride()`

Runtime overrides are stored in Redux (`app.featureFlagOverrides`) and take precedence over env defaults.

## Files

- Parser/defaults: `src/client/utilities/feature-flags.ts`
- Hook: `src/client/hooks/use-feature-flag.ts`
- Redux actions/state: `src/client/redux/app-actions.ts`

## Intent

This starter enables safe rollout and experimentation without branching strategy overhead. Teams can later replace env parsing with remote flag providers if needed.
