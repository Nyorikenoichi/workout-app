import * as React from 'react';
import { Button, List, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import exerciseImage from '../../assets/images/exerciseImage.png';
import Exercise from '../../core/interfaces/exercise';
import { ExercisesListItem } from './components/ExercisesListItem';
import ExercisesWrapper from './components/exercisesWrapper';
import { StartWorkoutButton } from './components/startWorkoutButton';

export default function Exercises() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { currentExerciseGroup } = state;

  const renderExercisesList = () => {
    return currentExerciseGroup?.exercises.map((item: Exercise) => {
      return <ExercisesListItem item={item} key={item.id} />;
    });
  };

  const onStartWorkout = () => {
    navigate(MainRoutes.workout);
  };

  return (
    <>
      <ExercisesWrapper>
        <Typography>
          <Link to={MainRoutes.main}>{t('back_to_main')}</Link>
        </Typography>
        <img src={exerciseImage} alt="" />
        <Typography>{currentExerciseGroup?.title}</Typography>
        <List>{renderExercisesList()}</List>
      </ExercisesWrapper>
      <StartWorkoutButton variant="contained" onClick={onStartWorkout}>
        {t('start_exercise')}
      </StartWorkoutButton>
    </>
  );
}
