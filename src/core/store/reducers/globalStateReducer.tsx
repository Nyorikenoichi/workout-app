import * as React from 'react';
import { User } from 'firebase/auth';
import {
  GlobalStateAction,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';

interface GlobalState {
  user: User | null;
}

export const initialState: GlobalState = { user: null };

export const ContextApp = React.createContext<{
  dispatch: React.Dispatch<GlobalStateAction>;
  state: GlobalState;
}>({
  dispatch: () => {
    throw new Error('invalid dispatch value');
  },
  state: initialState,
});

export function globalStateReducer(
  state: GlobalState,
  action: GlobalStateAction
) {
  switch (action.type) {
    case GlobalStateActionTypes.SetUser:
      return { user: action.payload };
    default:
      throw new Error();
  }
}
