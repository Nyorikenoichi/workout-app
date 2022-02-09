import { FirestoreError } from 'firebase/firestore';
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

export const getInitialDataAction =
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
    } finally {
      dispatch(setLoadingAction({ isLoading: false }));
    }
  };
