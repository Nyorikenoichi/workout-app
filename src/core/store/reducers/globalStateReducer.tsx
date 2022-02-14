import * as React from 'react';
import { User } from 'firebase/auth';
import {
  AugmentedDispatch,
  GlobalStateActionType,
  GlobalStateActionTypes,
  Thunk,
} from '../action-types/globalStateActionTypes';
import WorkoutData from '../../interfaces/workoutData';
import ExerciseGroup from '../../interfaces/exerciseGroup';
import { Statistics } from '../../interfaces/statistics';

export const augmentDispatch =
  <A, S>(dispatch: React.Dispatch<A>, state: S) =>
  (input: Thunk<A, S> | A) =>
    input instanceof Function ? input(dispatch, state) : dispatch(input);

export interface GlobalState {
  user: User | null;
  isLoading: boolean;
  statistics: Statistics | null | undefined;
  workouts: WorkoutData | null;
  currentExerciseGroup: ExerciseGroup | null;
  errorMessage: string;
}

export const initialState: GlobalState = {
  user: null,
  isLoading: true,
  statistics: null,
  workouts: null,
  currentExerciseGroup: null,
  errorMessage: '',
};

export const ContextApp = React.createContext<{
  dispatch: AugmentedDispatch<
    GlobalStateActionType<Partial<GlobalState>>,
    GlobalState
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
    case GlobalStateActionTypes.SetStatistics:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.SetWorkouts:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.SetCurrentExerciseGroup:
      return {
        ...state,
        ...action.payload,
      };
    case GlobalStateActionTypes.setErrorMessage:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
