import * as React from 'react';
import { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const currentExercise =
    state.currentExerciseGroup?.exercises[currentExerciseIndex];
  const exercisesCount = state.currentExerciseGroup?.exercises.length as number;

  const nextExercise = () => {
    if (currentExerciseIndex < exercisesCount - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  return (
    <>
      <Typography>{currentExercise?.title}</Typography>
      <div>
        <Button onClick={prevExercise}>prev</Button>
        <div>circle {currentExercise?.duration}</div>
        <Button onClick={nextExercise}>next</Button>
      </div>
      <img src={currentExercise?.photo} alt="" />
    </>
  );
}
