# Hooks

Custom React hooks for reusable stateful logic.

## Available Hooks

### `usePreferences`

A custom hook with `useReducer` and optional localStorage persistence.

```tsx
import { usePreferences } from '@/client/hooks/use-preferences';

const MyComponent = () => {
  const { preferences, setFontSize, toggleSidebar } = usePreferences();
  // With persistence disabled:
  // const { preferences } = usePreferences({ persist: false });

  return <div style={{ fontSize: preferences.fontSize }}>...</div>;
};
```

## Choosing a State Approach

| Approach | Complexity | Scope | Persistence | Best for |
|---|---|---|---|---|
| `useState` | Low | Single component | No | Form inputs, toggles, local UI state |
| `useReducer` | Medium | Single component | No | Complex state with multiple related transitions |
| Custom hook | Medium | Shared across components | Optional | Reusable logic (e.g. preferences, form validation) |
| Context + hook | Medium | Component subtree | Optional | Theme, locale, wizard state shared by a subtree |
| Redux | Higher | Global (whole app) | Yes (via middleware) | Auth state, persisted data, DevTools-visible state |

### Decision guide

1. **Start with `useState`**. It covers the majority of cases.
2. **Use `useReducer`** when a single component has multiple related state values and complex transitions (e.g. a form with validation, loading, and error states).
3. **Extract a custom hook** when multiple components need the same stateful logic. The hook encapsulates the reducer and side effects, keeping components clean.
4. **Add Context** when a subtree of components needs shared state but it doesn't belong globally (e.g. a multi-step form wizard).
5. **Use Redux** when state is truly global, needs to persist across sessions, benefits from DevTools, or is consumed by many unrelated components.

### Common mistakes

- **Reaching for Redux first**. Not every piece of state needs to be global. Start simple and escalate only when complexity demands it.
- **Putting derived state in a reducer**. If a value can be computed from other state, compute it during render instead of storing it.
- **Skipping custom hooks**. If you copy-paste the same `useState` + `useEffect` pattern in multiple components, extract it into a hook.
- **Over-using Context for frequent updates**. Context re-renders every consumer on change. For rapidly changing state (e.g. mouse position, animation), prefer other approaches.
