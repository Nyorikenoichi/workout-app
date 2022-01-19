import { User } from 'firebase/auth';
import {
  GlobalStateAction,
  GlobalStateActionTypes,
} from '../action-types/globalStateActionTypes';

const setUserAction = (user: User | null): GlobalStateAction => ({
  type: GlobalStateActionTypes.SetUser,
  payload: user,
});

export default setUserAction;
