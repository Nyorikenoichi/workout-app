import { User } from 'firebase/auth';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';
import WorkoutData from '../../interfaces/workoutData';

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

export const setFirebaseDataAction = (data: {
  firebaseData: Record<string, unknown> | null | undefined;
}): GlobalStateActionType<{
  firebaseData: Record<string, unknown> | null | undefined;
}> => ({
  type: GlobalStateActionTypes.SetFirebaseData,
  payload: data,
});

export const setWorkoutDataAction = (data: {
  workoutData: WorkoutData | null;
}): GlobalStateActionType<{ workoutData: WorkoutData | null }> => ({
  type: GlobalStateActionTypes.SetWorkoutData,
  payload: data,
});
