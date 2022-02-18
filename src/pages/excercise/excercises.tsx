import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MainRoutes } from '../../core/constants/mainRoutes';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import exerciseImage from '../../assets/images/exerciseImage.png';
import Exercise from '../../core/interfaces/exercise';
import { ExercisesListItem } from './components/ExercisesListItem';
import { ExercisesWrapper } from './components/styled/exercisesWrapper';
import { StartWorkoutButton } from './components/styled/startWorkoutButton';
import { ExercisesPoster } from './components/styled/exercisesPoster';
import { ExercisesDivider } from './components/styled/exercisesDivider';
import { ExercisesTitle } from './components/styled/exercisesTitle';
import { BackToMainButton } from './components/styled/backToMainButton';
import { ExercisesList } from './components/styled/exercisesList';

export const Exercises = React.memo(function Exercises() {
  const { state } = useContext(ContextApp);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { currentExerciseGroup } = state;
  const dayNumber =
    (state.statistics?.exercisesPerformedCount[
      currentExerciseGroup?.title as string
    ] as number) + 1;

  const renderExercisesList = () => {
    return currentExerciseGroup?.exercises.map((item: Exercise) => {
      return <ExercisesListItem item={item} key={item.id} />;
    });
  };

  const onBackToMain = () => {
    navigate(MainRoutes.main);
  };

  const onStartWorkout = () => {
    navigate(MainRoutes.workout);
  };

  return (
    <>
      <ExercisesWrapper>
        <BackToMainButton onClick={onBackToMain}>
          <ArrowBackIcon />
        </BackToMainButton>
        <ExercisesPoster src={exerciseImage} alt="" />
        <Typography>{`Day ${dayNumber}`}</Typography>
        <ExercisesTitle>{currentExerciseGroup?.title}</ExercisesTitle>
        <ExercisesDivider />
        <ExercisesList>{renderExercisesList()}</ExercisesList>
      </ExercisesWrapper>
      <StartWorkoutButton variant="contained" onClick={onStartWorkout}>
        {t('start_exercise')}
      </StartWorkoutButton>
    </>
  );
});
