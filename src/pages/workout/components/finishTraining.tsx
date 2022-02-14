import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MainRoutes } from '../../../core/constants/mainRoutes';
import { ContextApp } from '../../../core/store/reducers/globalStateReducer';
import { incrementExercisesProcessedAction } from '../../../core/store/thunk/firestore';

interface FinishTrainingProps {
  time: number;
}

export function FinishTraining({ time }: FinishTrainingProps) {
  const { dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const onSave = () => {
    dispatch(incrementExercisesProcessedAction());
  };

  return (
    <>
      <Typography variant="h2">{t('workout_complete')}</Typography>
      <Typography>{t('workout_summary')}</Typography>
      <Typography>{`Minutes: ${Math.round(time / 60)}`}</Typography>
      <Link to={MainRoutes.main}>
        <Button onClick={onSave}>{t('save_and_continue')}</Button>
      </Link>
    </>
  );
}
