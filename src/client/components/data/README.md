# State Management

This directory contains the Redux Toolkit state management layer for the application.

## Architecture

```
data/
├── store.ts           # Redux store configuration
├── persistence.ts     # Reusable encrypted localStorage middleware
├── player.ts          # Player slice (authentication, score)
├── player-actions.ts  # Player async thunks and sync actions
├── game.ts            # Game slice (level, high score, games played)
└── README.md          # This file
```

## Why Redux?

Redux remains the most battle-tested solution for complex state management. Its strict unidirectional data flow, devtools, and middleware ecosystem are excellent at scale. Redux Toolkit simplifies the traditional Redux ceremony with slices, which combine actions, reducers, and initial state in one place.

For this boilerplate, Redux provides:
- **DevTools visibility** — useful for debugging "why does the app think X is Y"
- **Middleware ecosystem** — the persistence middleware encrypts and saves state automatically
- **Predictable updates** — strict unidirectional flow prevents subtle bugs
- **Scalability** — as the app grows, Redux patterns scale well

## When to use what

| Approach | When to use |
|---|---|
| `useState` | Component-local UI state (form inputs, toggles, modals) |
| `useReducer` | Complex component-local state with multiple related values |
| Custom hook | Reusable stateful logic shared across components |
| Context + hook | State shared by a subtree but not the whole app (e.g. a form wizard) |
| Redux | Global state that persists, needs devtools, or drives many components |

**Rule of thumb**: start with `useState`. If state logic becomes complex within a component, reach for `useReducer`. If multiple components need the same state, consider whether it's a subtree concern (Context) or truly global (Redux).

## Persistence

State persistence is handled by `createPersistMiddleware` in `persistence.ts`. It:

1. Listens for every Redux action
2. Serializes the specified slices to JSON
3. Encrypts the JSON with CryptoJS AES
4. Stores the encrypted string in `localStorage`

To persist a new slice, add its key to the `sliceKeys` array in `store.ts`:

```ts
const persistMiddleware = createPersistMiddleware({
  sliceKeys: ['player', 'game', 'yourNewSlice'],
});
```

The encryption key is fetched from the server during initialization and is only available after authentication.

## Adding a new slice

1. Create a new file (e.g. `settings.ts`) following the pattern in `game.ts`
2. Add the reducer to `store.ts`
3. If the slice should persist, add its key to `sliceKeys` in `store.ts`
4. If the slice needs to restore from localStorage, add an `extraReducers` case for `initPlayer.fulfilled`

## Common pitfalls

- **Over-normalizing state**: Don't create separate actions for every conceivable state change. Use RTK's slice pattern which keeps things concise.
- **Putting everything in Redux**: Component-local state (form inputs, UI toggles) does not belong in the store. Only state that is truly global should be in Redux.
- **Deriving state in components**: Use selectors (or `createSelector` from RTK) to derive computed values. Don't store derived data in the state.
- **Mutating state outside of reducers**: RTK uses Immer, so mutations inside reducers are safe. Outside of reducers, always treat state as immutable.
- **Ignoring DevTools**: Redux DevTools is one of the biggest advantages — use it for debugging.
