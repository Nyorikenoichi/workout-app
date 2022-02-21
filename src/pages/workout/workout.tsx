import * as React from 'react';
import { useContext } from 'react';
import { IconButton, Typography } from '@mui/material';
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
import { VideoOverlay } from './components/videoOverlay';
import { ControllsEmptyDiv } from './components/styled/controllsEmptyDiv';
import { ControllsButton } from './components/styled/ControllsButton';
import useExerciseTimer from '../../core/hooks/useExerciseTimer';
import Exercise from '../../core/interfaces/exercise';

export const Workout = React.memo(function Workout() {
  const { state } = useContext(ContextApp);

  const {
    currentExercise,
    currentExerciseIndex,
    isPaused,
    switchPause,
    isPreparing,
    nextExercise,
    prevExercise,
    exerciseCounter,
    convertCounterToPercent,
    totalTime,
    trainingFinished,
    videoRef,
  } = useExerciseTimer(state.currentExerciseGroup?.exercises as Exercise[]);

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
});
