import * as React from 'react';
import { GlobalStateActionTypes } from '../action-types/globalStateActionTypes';

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

export function globalStateReducer(state: GlobalState, action: Action) {
  switch (action.type) {
    case GlobalStateActionTypes.inc:
      return { count: state.count + 1 };
    case GlobalStateActionTypes.dec:
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
