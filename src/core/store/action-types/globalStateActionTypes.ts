import { User } from 'firebase/auth';

export interface GlobalStateAction {
  type: string;
  payload: User | null;
}

export enum GlobalStateActionTypes {
  SetUser = 'set user',
}
