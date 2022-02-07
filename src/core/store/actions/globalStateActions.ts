import { User } from 'firebase/auth';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';
import WorkoutData from '../../interfaces/workoutData';
import ExerciseGroup from '../../interfaces/exerciseGroup';

export const setUserAction = (user: {
  user: User | null;
}): GlobalStateActionType<{ user: User | null }> => ({
  type: GlobalStateActionTypes.SetUser,
  payload: user,
});

export const setLoadingAction = (isLoading: {
  isLoading: boolean;
}): GlobalStateActionType<{ isLoading: boolean }> => ({
  type: GlobalStateActionTypes.SetLoading,
  payload: isLoading,
});

export const setStatisticsAction = (data: {
  statistics: Record<string, unknown> | null | undefined;
}): GlobalStateActionType<{
  statistics: Record<string, unknown> | null | undefined;
}> => ({
  type: GlobalStateActionTypes.SetStatistics,
  payload: data,
});

export const setWorkoutsAction = (data: {
  workouts: WorkoutData | null;
}): GlobalStateActionType<{ workouts: WorkoutData | null }> => ({
  type: GlobalStateActionTypes.SetWorkouts,
  payload: data,
});

export const setCurrentExerciseGroupAction = (data: {
  currentExerciseGroup: ExerciseGroup | null;
}): GlobalStateActionType<{ currentExerciseGroup: ExerciseGroup | null }> => ({
  type: GlobalStateActionTypes.SetCurrentExerciseGroup,
  payload: data,
});

export const setErrorMessageAction = (data: {
  errorMessage: string;
}): GlobalStateActionType<{ errorMessage: string }> => ({
  type: GlobalStateActionTypes.SetWorkouts,
  payload: data,
});
