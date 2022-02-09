import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { ControllsContainer } from './components/controllsContainer';
import { Progress } from './components/progress';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const currentExercise =
    state.currentExerciseGroup?.exercises[currentExerciseIndex];
  const exercisesCount = state.currentExerciseGroup?.exercises.length as number;

  const [counter, setCounter] = useState(5);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isPreparing, setPreparing] = useState(true);

  const nextExercise = () => {
    if (currentExerciseIndex < exercisesCount - 1) {
      setCurrentExerciseIndex((index) => index + 1);
      setCounter(5);
      setPreparing(true);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((index) => index - 1);
      setCounter(5);
      setPreparing(true);
    }
  };

  const switchPause = () => {
    setTimerPaused((pause) => !pause);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter === 0 && isPreparing) {
      setPreparing(false);
      setCounter(currentExercise?.duration as number);
    }
    if (counter === 0 && !isPreparing) {
      nextExercise();
    }

    if (!timerPaused) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, timerPaused]);

  return (
    <>
      <Typography>
        {isPreparing ? 'Get ready' : currentExercise?.title}
      </Typography>
      <ControllsContainer>
        <Button onClick={prevExercise}>prev</Button>
        <Progress
          progressValue={
            100 -
            (100 * counter) /
              (isPreparing ? 5 : (currentExercise?.duration as number))
          }
          displayValue={counter}
        />
        <Button onClick={nextExercise}>next</Button>
      </ControllsContainer>
      {isPreparing ? (
        <img src={currentExercise?.photo} alt="" />
      ) : (
        <video src={currentExercise?.video} autoPlay loop>
          <track kind="captions" />
        </video>
      )}
      <Button onClick={switchPause}>Pause</Button>
    </>
  );
}
