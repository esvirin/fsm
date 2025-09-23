# 1. Explain why you think it is remarkable and the provided value:

I find this remarkable because it demonstrates a well-structured and type-safe implementation of a finite state machine in React. It provides clear separation of states, events, and transitions, making the logic easy to understand and maintain. The hook not only allows triggering events via a generic transition function but also provides ready-to-use action functions, improving developer ergonomics. Its value is enhanced by being lightweight, with no side libraries or external dependencies, which makes it easy to integrate into any React project without increasing bundle size or complexity. This reduces bugs, improves maintainability, and ensures type safety for complex UI logic.

# 2. What quality controls were or not used? Little explanation:

The implementation uses TypeScript typing as a quality control, ensuring that only valid states and events can be used, preventing many runtime errors. The useMemo hook provides performance-related control by memoizing action functions to avoid unnecessary re-renders. However, there are no runtime checks for invalid transitions—they are silently ignored—so adding warnings or errors could improve runtime reliability. The component is also dependency-free, relying only on React itself, which minimizes potential issues from third-party libraries.

# useMachine

A **TypeScript-friendly React hook** for implementing finite state machines (FSM) in your React applications. It provides a simple way to define states, events, and transitions while maintaining full type safety.

---

## API

### `useMachine(machine)`

Hook to manage a finite state machine.

#### Parameters

| Name      | Type         | Description               |
| --------- | ------------ | ------------------------- |
| `machine` | `Machine<S>` | State machine definition. |

#### Returns

`[state, actions, transition]`

| Return       | Type                      | Description                                        |
| ------------ | ------------------------- | -------------------------------------------------- |
| `state`      | `S`                       | Current state of the machine.                      |
| `actions`    | `{ [event]: () => void }` | Functions to trigger events for the current state. |
| `transition` | `(event: string) => void` | Generic function to trigger a transition by event. |

---

## Types

```ts
type Config<S extends string> = {
  on: Record<string, S>;
};

export type Machine<S extends string> = {
  initial: S;
  states: Record<S, Config<S>>;
};
```
