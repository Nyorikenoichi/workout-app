import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ContextApp } from '../../core/store/reducers/globalStateReducer';
import { ControllsContainer } from './components/styled/controllsContainer';
import { Progress } from './components/progress';
import { FinishTraining } from './components/finishTraining';
import { WorkoutWrapper } from './components/styled/workoutWrapper';
import { WorkoutDivider } from './components/styled/workoutDivider';
import { PauseButtonWrapper } from './components/styled/pauseButtonWrapper';
import { PlayIcon } from './components/styled/playIcon';
import { PauseIcon } from './components/styled/pauseIcon';
import VideoOverlay from './components/videoOverlay';
import { ControllsEmptyDiv } from './components/styled/overlay/controllsEmptyDiv';
import { ControllsButton } from './components/styled/overlay/ControllsButton';

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

  const videoRef = useRef<HTMLVideoElement>(null);

  const switchPause = () => {
    if (isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setPaused((pause) => !pause);
  };

  const handleSpaceDown = (event: KeyboardEvent): void => {
    if (event.code === 'Space') {
      switchPause();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleSpaceDown);

    return () => {
      document.removeEventListener('keydown', handleSpaceDown);
    };
  }, []);

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

  return (
    <WorkoutWrapper>
      {trainingFinished ? (
        <FinishTraining time={totalTime} />
      ) : (
        <>
          <Typography fontSize={24} fontWeight={600} marginTop="20px">
            {isPreparing ? 'Get ready' : currentExercise?.title}
          </Typography>
          <ControllsContainer>
            {currentExerciseIndex > 0 ? (
              <ControllsButton
                onClick={prevExercise}
                variant="outlined"
                size="large"
              >
                <SkipPreviousIcon />
              </ControllsButton>
            ) : (
              <ControllsEmptyDiv />
            )}
            <Progress
              progressValue={convertCounterToPercent()}
              displayValue={exerciseCounter}
            />
            <ControllsButton
              onClick={nextExercise}
              variant="outlined"
              size="large"
            >
              <SkipNextIcon />
            </ControllsButton>
          </ControllsContainer>
          <div>
            {isPaused && <VideoOverlay />}
            <video
              ref={videoRef}
              width={800}
              height={450}
              src={currentExercise?.video}
              autoPlay
              loop
            >
              <track kind="captions" />
            </video>
          </div>
          <PauseButtonWrapper>
            <WorkoutDivider />
            <IconButton onClick={switchPause}>
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </IconButton>
          </PauseButtonWrapper>
        </>
      )}
    </WorkoutWrapper>
  );
}
