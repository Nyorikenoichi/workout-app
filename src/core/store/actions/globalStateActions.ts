import { User } from 'firebase/auth';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';

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
  firebaseData: Record<string, unknown> | null;
}): GlobalStateActionType<{
  firebaseData: Record<string, unknown> | null;
}> => ({
  type: GlobalStateActionTypes.SetFirebaseData,
  payload: data,
});

export const setWorkoutDataAction = (data: {
  workoutData: Record<string, unknown> | null;
}): GlobalStateActionType<{ workoutData: Record<string, unknown> | null }> => ({
  type: GlobalStateActionTypes.SetWorkoutData,
  payload: data,
});
