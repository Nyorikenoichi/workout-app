import {
  GlobalStateActionTypes,
  GlobalStateAction,
} from '../action-types/globalStateActionTypes';

export const incrementAction = (): GlobalStateAction => ({
  type: GlobalStateActionTypes.Increment,
});

export const decrementAction = (): GlobalStateAction => ({
  type: GlobalStateActionTypes.Decrement,
});
