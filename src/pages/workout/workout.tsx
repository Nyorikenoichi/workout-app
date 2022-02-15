import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { ControllsContainer } from './components/styled/controllsContainer';
import { Progress } from './components/progress';
import { FinishTraining } from './components/finishTraining';

export default function Workout() {
  const { state } = useContext(ContextApp);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseCounter, setCounter] = useState(5);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setPaused] = useState(false);
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
    setPaused((pause) => !pause);
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
      if (!isPaused) {
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
        <Button onClick={prevExercise} variant="outlined">
          <SkipPreviousIcon />
        </Button>
        <Progress
          progressValue={convertCounterToPercent()}
          displayValue={exerciseCounter}
          isPaused={isPaused}
        />
        <Button onClick={nextExercise} variant="outlined">
          <SkipNextIcon />
        </Button>
      </ControllsContainer>
      <video src={currentExercise?.video} autoPlay loop>
        <track kind="captions" />
      </video>
      <IconButton onClick={switchPause}>
        {isPaused ? (
          <PlayCircleIcon fontSize="large" />
        ) : (
          <PauseCircleIcon fontSize="large" />
        )}
      </IconButton>
    </>
  );
}
