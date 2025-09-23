import React from "react";
import { useMachine, type Machine } from "./useMachine";

type State = "idle" | "running" | "paused" | "end";

const machine: Machine<State> = {
  initial: "idle",
  states: {
    idle: {
      on: { START: "running" },
    },
    running: {
      on: { STOP: "end", PAUSE: "paused" },
    },
    paused: {
      on: { RESUME: "running", STOP: "end" },
    },
    end: {
      on: { RESET: "idle" },
    },
  },
};

function App() {
  const [state, actions] = useMachine(machine);
  React.useEffect(() => {
    if (state === "end") {
      const timeout = setTimeout(() => actions.RESET(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [state, actions]);
  return (
    <div>
      <h1>{state}</h1>
      <ul>
        {Object.entries(actions).map(([s, a]) => (
          <li key={s}>
            <button onClick={a}>{s}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
