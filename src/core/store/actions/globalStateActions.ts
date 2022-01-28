import { User } from 'firebase/auth';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';

export const setUserAction = (user: User | null): GlobalStateActionType => ({
  type: GlobalStateActionTypes.SetUser,
  payload: user,
});

export const setLoadingAction = (
  isLoading: boolean
): GlobalStateActionType => ({
  type: GlobalStateActionTypes.SetLoading,
  payload: isLoading,
});
