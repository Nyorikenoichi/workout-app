import { User } from 'firebase/auth';

export enum GlobalStateActionTypes {
  SetUser = 'setUser',
  SetLoading = 'SetLoading',
}

export interface SetUserActionType {
  type: typeof GlobalStateActionTypes.SetUser;
  payload: User | null;
}

export interface SetLoadingActionType {
  type: typeof GlobalStateActionTypes.SetLoading;
  payload: { isLoading: boolean };
}

export type GlobalStateActionType = SetUserActionType | SetLoadingActionType;
