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
): GlobalState {
  switch (action.type) {
    case GlobalStateActionTypes.SetUser:
      return {
        ...state,
        user: action.payload?.user as User,
      };
    case GlobalStateActionTypes.SetLoading:
      return {
        ...state,
        isLoading: !!action.payload?.isLoading,
      };
    case GlobalStateActionTypes.SetStatistics:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          ...(action.payload?.statistics as Statistics),
        },
      };
    case GlobalStateActionTypes.SetWorkouts:
      return {
        ...state,
        workouts: action.payload?.workouts as WorkoutData,
      };
    case GlobalStateActionTypes.SetCurrentExerciseGroup:
      return {
        ...state,
        currentExerciseGroup: action.payload
          ?.currentExerciseGroup as ExerciseGroup,
      };
    case GlobalStateActionTypes.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload?.errorMessage as string,
      };
    default:
      return state;
  }
}
