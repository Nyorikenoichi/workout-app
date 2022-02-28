import { doc, FirestoreError, setDoc } from 'firebase/firestore';
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
import { getWorkouts } from '../../api/workouts';
import { getStatistics } from '../../api/statistics';
import { db } from '../../firebase/firebaseInit';

export const getInitialDataAction =
  (): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch, state) => {
    try {
      const workouts = await getWorkouts();
      const statistics = await getStatistics(state);

      dispatch(setWorkoutsAction({ workouts }));
      dispatch(setStatisticsAction({ statistics }));
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as FirestoreError).code })
      );
    }
  };

export const incrementExercisesProcessedAction =
  (): Thunk<GlobalStateActionType<Partial<GlobalState>>, GlobalState> =>
  async (dispatch, state) => {
    try {
      dispatch(setLoadingAction({ isLoading: true }));
      const newStatistics = state.statistics;
      if (newStatistics) {
        newStatistics.exercisesPerformedCount[
          state.currentExerciseGroup?.title as string
        ] += 1;
      }
      dispatch(setStatisticsAction({ statistics: newStatistics }));
      await setDoc(doc(db, 'users', state.user?.uid as string), newStatistics);
    } catch (error) {
      dispatch(
        setErrorMessageAction({ errorMessage: (error as FirestoreError).code })
      );
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };
