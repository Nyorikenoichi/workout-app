import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import {
  GlobalStateActionType,
  Thunk,
} from '../action-types/globalStateActionTypes';
import { GlobalState } from '../reducers/globalStateReducer';
import { auth, db } from '../../firebase/firebaseInit';
import {
  setFirebaseDataAction,
  setLoadingAction,
  setWorkoutsAction,
} from '../actions/globalStateActions';

export const getBackendDataAction =
  (): Thunk<
    GlobalStateActionType<Partial<GlobalState>>,
    Partial<GlobalState>
  > =>
  async (dispatch, state) => {
    async function getWorkouts() {
      const api = process.env.REACT_APP_WORKOUT_API as string;
      const response = await fetch(api);
      const dataJson = await response.json();
      dispatch(
        setWorkoutsAction({
          workouts: dataJson.data,
        })
      );
    }

    async function getFirestoreData() {
      const docRef = doc(db, 'users', state.user?.uid as string);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      dispatch(
        setFirebaseDataAction({
          firebaseData: data,
        })
      );
    }

    dispatch(setLoadingAction({ isLoading: true }));
    await getWorkouts();
    await getFirestoreData();
    dispatch(setLoadingAction({ isLoading: false }));
  };

export const logOutAction =
  (): Thunk<
    GlobalStateActionType<Partial<GlobalState>>,
    Partial<GlobalState>
  > =>
  async (dispatch) => {
    dispatch(setLoadingAction({ isLoading: true }));
    await signOut(auth);
    dispatch(setFirebaseDataAction({ firebaseData: null }));
    dispatch(setWorkoutsAction({ workouts: null }));
  };
