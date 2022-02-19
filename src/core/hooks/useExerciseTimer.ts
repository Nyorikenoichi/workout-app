import { RefObject, useEffect, useRef, useState } from 'react';
import Exercise from '../interfaces/exercise';
import { GlobalState } from '../store/reducers/globalStateReducer';

const preparingDuration = 5;
const counterInterval = 1000;
const fullProgress = 100;

export default function useExerciseTimer(
  state: GlobalState
): [
  Exercise | undefined,
  number,
  boolean,
  () => void,
  boolean,
  () => void,
  () => void,
  number,
  () => number,
  number,
  boolean,
  RefObject<HTMLVideoElement>
] {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseCounter, setCounter] = useState(preparingDuration);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isPreparing, setPreparing] = useState(true);
  const [trainingFinished, setTrainingFinished] = useState(false);

  const currentExercise =
    state.currentExerciseGroup?.exercises[currentExerciseIndex];
  const exercisesCount = state.currentExerciseGroup?.exercises.length as number;

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
    }, counterInterval);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [totalTime, isPaused]);

  const convertCounterToPercent = () => {
    return (
      fullProgress -
      (fullProgress * exerciseCounter) /
        (isPreparing
          ? preparingDuration
          : (currentExercise?.duration as number))
    );
  };

  return [
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
  ];
}
