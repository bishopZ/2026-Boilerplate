# Redux

Redux in this boilerplate is intentionally small and practical.

## Why Redux here?

- Cross-page state belongs in one predictable store.
- DevTools-friendly action history helps debugging.
- Persistence middleware centralizes storage behavior.

## Current reducers

- `preferences`: global UI/user preferences plus encrypted persistence support.
- `app`: example non-persisted global slice (`lastEditId`, `searchPhrase`).

## Persistence model

- Persistence is opt-in by adding a slice registration in `store.ts`.
- Writes are throttled with a minimum delay of 100ms.
- Persistence mechanics (throttle, scheduling, localStorage writes) are centralized in `src/client/utilities/persistence.ts`.
- Reducers not registered for persistence (like `app`) remain non-persistent without extra store logic.

## Pitfalls to avoid

- Do not put transient component-only state in Redux.
- Keep selectors narrow to avoid unnecessary renders.
- Avoid storing derived values that can be computed on render.
- Keep reducers serializable; persistence/encryption belongs in middleware.

## Decision guide

Prefer:
- `useState` for local UI state.
- a custom hook for reusable local logic.
- Redux for global state shared by unrelated parts of the app.
