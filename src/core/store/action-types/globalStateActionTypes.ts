import React from 'react';

export interface GlobalStateActionType<P> {
  type: string;
  payload?: P;
}

export type Thunk<A, S> = (dispatch: React.Dispatch<A>, state: S) => void;
export type AugmentedDispatch<A, S> = React.Dispatch<Thunk<A, S> | A>;

export enum GlobalStateActionTypes {
  SetUser = 'setUser',
  SetLoading = 'SetLoading',
  SetStatistics = 'setStatistics',
  SetWorkouts = 'setWorkouts',
  setErrorMessage = 'setErrorMessage',
}
