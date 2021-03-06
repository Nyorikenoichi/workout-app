import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  GlobalStateActionType,
  Thunk,
} from '../action-types/globalStateActionTypes';
import { GlobalState } from '../reducers/globalStateReducer';
import {
  setErrorMessageAction,
  setLoadingAction,
  setStatisticsAction,
  setWorkoutsAction,
} from '../actions/globalStateActions';
import { auth, db } from '../../firebase/firebaseInit';
import {
  AuthFormValues,
  RegisterFormValues,
} from '../../interfaces/formValues';
import { exerciseGroupNames } from '../../constants/exerciseGroupNames';
import { Statistics } from '../../interfaces/statistics';

export const logOutAction =
  (): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));
      dispatch(setStatisticsAction({ statistics: null }));
      dispatch(setWorkoutsAction({ workouts: null }));
      await signOut(auth);
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

      const initialStatistics: Statistics = {
        exercisesPerformedCount: {},
      };
      const exercises = Object.values(exerciseGroupNames) as string[];
      exercises.forEach((exercise) => {
        initialStatistics.exercisesPerformedCount[exercise] = 0;
      });

      await setDoc(doc(db, 'users', cred.user.uid), initialStatistics);
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as AuthError).code })
      );
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };
