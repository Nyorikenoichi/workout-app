import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { ControllsContainer } from './components/styled/controllsContainer';
import { Progress } from './components/progress';
import { FinishTraining } from './components/finishTraining';

export default function Workout() {
  const { state, dispatch } = useContext(ContextApp);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseCounter, setCounter] = useState(5);
  const [totalTime, setTotalTime] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isPreparing, setPreparing] = useState(true);
  const [trainingFinished, setTrainingFinished] = useState(false);

  const currentExercise =
    state.currentExerciseGroup?.exercises[currentExerciseIndex];
  const exercisesCount = state.currentExerciseGroup?.exercises.length as number;

  const preparingDuration = 5;
  const oneSecond = 1000;

  const nextExercise = () => {
    if (currentExerciseIndex < exercisesCount - 1) {
      setCurrentExerciseIndex((index) => index + 1);
      setCounter(preparingDuration);
      setPreparing(true);
    } else {
      setTrainingFinished(true);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((index) => index - 1);
      setCounter(preparingDuration);
      setPreparing(true);
    }
  };

  const switchPause = () => {
    setTimerPaused((pause) => !pause);
  };

  useEffect(() => {
    if (exerciseCounter === 0 && isPreparing) {
      setPreparing(false);
      setCounter(currentExercise?.duration as number);
    }
    if (exerciseCounter === 0 && !isPreparing) {
      nextExercise();
    }

    const timer = setTimeout(() => {
      if (!timerPaused) {
        setCounter((c) => c - 1);
      }
      setTotalTime((time) => time + 1);
    }, oneSecond);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [totalTime]);

  const convertCounterToPercent = () => {
    return (
      100 -
      (100 * exerciseCounter) /
        (isPreparing
          ? preparingDuration
          : (currentExercise?.duration as number))
    );
  };

  return trainingFinished ? (
    <FinishTraining time={totalTime} />
  ) : (
    <>
      <Typography>
        {isPreparing ? 'Get ready' : currentExercise?.title}
      </Typography>
      <ControllsContainer>
        <Button onClick={prevExercise}>prev</Button>
        <Progress
          progressValue={convertCounterToPercent()}
          displayValue={exerciseCounter}
          isPaused={timerPaused}
        />
        <Button onClick={nextExercise}>next</Button>
      </ControllsContainer>
      <video src={currentExercise?.video} autoPlay loop>
        <track kind="captions" />
      </video>
      <Button onClick={switchPause}>Pause</Button>
    </>
  );
}
