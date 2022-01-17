import {
  GlobalStateActionTypes,
  GlobalStateAction,
} from '../action-types/globalStateActionTypes';

export const globalStateInc = (): GlobalStateAction => ({
  type: GlobalStateActionTypes.inc,
});

export const globalStateDec = (): GlobalStateAction => ({
  type: GlobalStateActionTypes.dec,
});
