import * as React from 'react';

interface GlobalState {
  count: number;
}

interface Action {
  type: string;
}

export const initialState: GlobalState = { count: 0 };

export const ContextApp = React.createContext<{
  dispatch: React.Dispatch<Action>;
  state: GlobalState;
}>({
  dispatch: () => {
    throw new Error('invalid dispatch value');
  },
  state: initialState,
});

export function reducer(state: GlobalState, action: Action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
