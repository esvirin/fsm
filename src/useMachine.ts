import React from "react";

type Config<S extends string> = {
  on: Record<string, S>;
};

export type Machine<S extends string> = {
  initial: S;
  states: Record<S, Config<S>>;
};

export const useMachine = <S extends string>(machine: Machine<S>) => {
  const [state, setState] = React.useState<S>(machine.initial);

  const transition = <E extends string>(event: E) => {
    const nextState = machine.states[state].on[event];
    if (nextState) setState(nextState);
  };

  const actions = React.useMemo(() => {
    const currentConfig = machine.states[state];
    type Events = Extract<keyof (typeof currentConfig)["on"], string>;
    const keys = Object.keys(currentConfig.on) as Events[];

    return keys.reduce((acc, event) => {
      acc[event] = () => transition(event);
      return acc;
    }, {} as { [K in Events]: () => void });
  }, [state]);

  return [state, actions, transition] as const;
};
