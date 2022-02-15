import * as React from 'react';
import { Button, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import exerciseImage from '../../assets/images/exerciseImage.png';
import Exercise from '../../core/interfaces/exercise';
import { ExercisesListItem } from './components/ExercisesListItem';
import ExercisesWrapper from './components/exercisesWrapper';

export default function Exercises() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const { currentExerciseGroup } = state;

  const renderExercisesList = () => {
    return currentExerciseGroup?.exercises.map((item: Exercise) => {
      return <ExercisesListItem item={item} key={item.id} />;
    });
  };

  return (
    <ExercisesWrapper>
      <Typography>
        <Link to={MainRoutes.main}>{t('back_to_main')}</Link>
      </Typography>
      <img src={exerciseImage} alt="" />
      <Typography>{currentExerciseGroup?.title}</Typography>
      <List>{renderExercisesList()}</List>
      <Link to={MainRoutes.workout}>
        <Button variant="contained">Start Exercise</Button>
      </Link>
    </ExercisesWrapper>
  );
}
