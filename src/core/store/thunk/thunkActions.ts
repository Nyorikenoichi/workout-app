import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { FirestoreError, doc, setDoc } from 'firebase/firestore';
import {
  GlobalStateActionType,
  Thunk,
} from '../action-types/globalStateActionTypes';
import { GlobalState } from '../reducers/globalStateReducer';
import { auth, db } from '../../firebase/firebaseInit';
import {
  setErrorMessageAction,
  setLoadingAction,
  setStatisticsAction,
  setWorkoutsAction,
} from '../actions/globalStateActions';
import { getWorkouts } from '../../api/workouts';
import { getStatistics } from '../../api/statistics';
import {
  AuthFormValues,
  RegisterFormValues,
} from '../../interfaces/formValues';

export const getBackendDataAction =
  (): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch, state) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));

      const workouts = await getWorkouts();
      const statistics = await getStatistics(state);

      dispatch(setWorkoutsAction({ workouts }));
      dispatch(setStatisticsAction({ statistics }));
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as FirestoreError).code })
      );
      console.log(error);
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };

export const logOutAction =
  (): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));

      await signOut(auth);
      dispatch(setStatisticsAction({ statistics: null }));
      dispatch(setWorkoutsAction({ workouts: null }));
      dispatch(setLoadingAction({ isLoading: false }));
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as AuthError).code })
      );
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };

export const loginAction =
  (
    values: AuthFormValues
  ): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));
      await signInWithEmailAndPassword(auth, values.email, values.password);
      dispatch(setLoadingAction({ isLoading: true }));
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as AuthError).code })
      );
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };

export const registerAction =
  (
    values: RegisterFormValues
  ): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));
      if (values.password !== values.confirmPassword) {
        const error: AuthError = {
          customData: { appName: '' },
          stack: '',
          message: '',
          name: 'FirebaseError',
          code: 'auth/confirm-password-error',
        };
        throw error;
      }
      const cred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(cred.user, {
        displayName: values.userName,
      });
      await setDoc(doc(db, 'users', cred.user.uid), {
        someData: Math.random() * 100,
      });
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as AuthError).code })
      );
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };
