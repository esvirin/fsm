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
