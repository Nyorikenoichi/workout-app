import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { secondsToMinutes } from 'src/core/helpers/date';
import { MainRoutes } from '../../../core/constants/mainRoutes';
import { ContextApp } from '../../../core/store/reducers/globalStateReducer';
import { incrementExercisesProcessedAction } from '../../../core/store/thunk/firestore';
import { FinishIcon } from './styled/finish/finishIcon';
import { FinishButton } from './styled/finish/finishButton';
import { FinishDescription } from './styled/finish/finishDescription';
import { FinishTitle } from './styled/finish/finishTitle';

interface FinishTrainingProps {
  time: number;
}

export function FinishTraining({ time }: FinishTrainingProps) {
  const { dispatch } = useContext(ContextApp);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSave = () => {
    dispatch(incrementExercisesProcessedAction());
    navigate(MainRoutes.main);
  };

  return (
    <>
      <FinishIcon />
      <FinishTitle>{t('workout_complete')}</FinishTitle>
      <FinishDescription>{t('workout_summary')}</FinishDescription>
      <Typography fontSize={14}>{t('minutes')}</Typography>
      <Typography fontSize={40} fontWeight={600}>
        {secondsToMinutes(time)}
      </Typography>
      <FinishButton variant="contained" onClick={onSave}>
        {t('save_and_continue')}
      </FinishButton>
    </>
  );
}
