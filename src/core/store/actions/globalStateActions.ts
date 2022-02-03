import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  GlobalStateActionType,
  GlobalStateActionTypes,
  Thunk,
} from '../action-types/globalStateActionTypes';
import WorkoutData from '../../interfaces/workoutData';
import { db } from '../../firebase/firebaseInit';
import { GlobalState } from '../reducers/globalStateReducer';

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

export const getBackendDataAction =
  (): Thunk<
    GlobalStateActionType<Partial<GlobalState>>,
    Partial<GlobalState>
  > =>
  (dispatch, state) => {
    async function getWorkoutData() {
      const api = process.env.REACT_APP_WORKOUT_API as string;
      const response = await fetch(api);
      const dataJson = await response.json();
      dispatch(
        setWorkoutDataAction({
          workoutData: dataJson.data,
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

    async function getData() {
      dispatch(setLoadingAction({ isLoading: true }));
      await getWorkoutData();
      await getFirestoreData();
      dispatch(setLoadingAction({ isLoading: false }));
    }

    getData();
  };
