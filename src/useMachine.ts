import React from "react";

type Actions<S extends string> = Record<string, S>;


export type Machine<S extends string> = {
  initial: S;
  states: Record<S, Actions<S>>;
};

export const useMachine = <S extends string>(machine: Machine<S>) => {
  const [state, setState] = React.useState<S>(machine.initial);

  const transition = <E extends string>(event: E) => {
    const nextState = machine.states[state][event];
    if (!nextState) throw new Error('Unknown Action')
    setState(nextState);
  };

  const actions = React.useMemo(() => {
    const config = machine.states[state];
    type Events = Extract<keyof (typeof config), string>;
    const keys = Object.keys(config) as Events[];

    return keys.reduce((acc, event) => {
      acc[event] = () => transition(event);
      return acc;
    }, {} as { [K in Events]: () => void });
  }, [state]);

  return [state, actions, transition] as const;
};
