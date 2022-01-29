import * as React from 'react';
import { User } from 'firebase/auth';
import {
  AugmentedDispatch,
  GlobalStateActionType,
  GlobalStateActionTypes,
  Thunk,
} from '../action-types/globalStateActionTypes';

export const augmentDispatch =
  <A, S>(dispatch: React.Dispatch<A>, state: S) =>
  (input: Thunk<A, S> | A) =>
    input instanceof Function ? input(dispatch, state) : dispatch(input);

export interface GlobalState {
  user: User | null;
  isLoading: boolean;
  firebaseData: Record<string, unknown> | null;
  workoutData: Record<string, unknown> | null;
}

export const initialState: GlobalState = {
  user: null,
  isLoading: true,
  firebaseData: null,
  workoutData: null,
};

export const ContextApp = React.createContext<{
  dispatch: AugmentedDispatch<
    GlobalStateActionType<Partial<GlobalState>>,
    Partial<GlobalState>
  >;
  state: GlobalState;
}>({
  dispatch: () => {
    throw new Error('invalid dispatch value');
  },
  state: initialState,
});

export function globalStateReducer(
  state: GlobalState,
  action: GlobalStateActionType<Partial<GlobalState>>
) {
  switch (action.type) {
    case GlobalStateActionTypes.SetUser:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.SetLoading:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.SetFirebaseData:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.SetWorkoutData:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
