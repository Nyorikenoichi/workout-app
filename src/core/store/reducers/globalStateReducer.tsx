import * as React from 'react';
import { User } from 'firebase/auth';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';

interface GlobalState {
  user: User | null;
  isLoading: boolean;
}

export const initialState: GlobalState = { user: null, isLoading: true };

export const ContextApp = React.createContext<{
  dispatch: React.Dispatch<GlobalStateActionType>;
  state: GlobalState;
}>({
  dispatch: () => {
    throw new Error('invalid dispatch value');
  },
  state: initialState,
});

export function globalStateReducer(
  state: GlobalState,
  action: GlobalStateActionType
) {
  switch (action.type) {
    case GlobalStateActionTypes.SetUser:
      return {
        ...state,
        user: action.payload,
      };
    case GlobalStateActionTypes.SetLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
