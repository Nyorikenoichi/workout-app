import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AuthError } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Alert, Dialog, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { getBackendDataAction } from '../../core/store/thunk/thunkActions';
import WorkoutCard from './components/workoutCard';
import CardsWrapper from './components/cardsWrapper';
import ExerciseGroup from '../../core/interfaces/exerciseGroup';
import useNotification from '../../core/hooks/useNotification';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const [notification, showNotification, closeNotification] = useNotification();

  useEffect(() => {
    try {
      dispatch(getBackendDataAction());
    } catch (error) {
      showNotification(t((error as AuthError).code));
    }
  }, []);

  function renderCards(cards: ExerciseGroup[]): JSX.Element[] {
    return cards.map((card) => <WorkoutCard key={card.title} card={card} />);
  }

  return (
    <>
      <Dialog open={notification.open}>
        <Alert severity="error">{notification.message}</Alert>
        <DialogActions>
          <Button onClick={closeNotification}>{t('close')}</Button>
        </DialogActions>
      </Dialog>
      <CardsWrapper>
        {state.workouts && renderCards(state.workouts.questions)}
      </CardsWrapper>
    </>
  );
}
