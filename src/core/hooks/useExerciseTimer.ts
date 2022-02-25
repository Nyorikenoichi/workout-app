import { RefObject, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import Exercise from '../interfaces/exercise';
import timerBeep from '../../assets/sound/timerBeep.mp3';
import whistle from '../../assets/sound/whistle.mp3';
import finish from '../../assets/sound/finishTraining.mp3';

const preparingDuration = 5;
const counterInterval = 1000;
const fullProgress = 100;

export default function useExerciseTimer(currentExercises: Exercise[]): {
  currentExercise: Exercise | undefined;
  currentExerciseIndex: number;
  isPaused: boolean;
  switchPause: () => void;
  isPreparing: boolean;
  nextExercise: () => void;
  prevExercise: () => void;
  exerciseCounter: number;
  convertCounterToPercent: () => number;
  totalTime: number;
  trainingFinished: boolean;
  videoRef: RefObject<HTMLVideoElement>;
} {
  const [playBeep] = useSound(timerBeep, { volume: 0.5 });
  const [playWhistle] = useSound(whistle, { volume: 0.5 });
  const [playFinish] = useSound(finish, { volume: 0.5 });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseCounter, setCounter] = useState(preparingDuration);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isPreparing, setPreparing] = useState(true);
  const [trainingFinished, setTrainingFinished] = useState(false);

  const currentExercise = currentExercises[currentExerciseIndex];
  const exercisesCount = currentExercises.length as number;

  const nextExercise = () => {
    if (currentExerciseIndex < exercisesCount - 1) {
      setCurrentExerciseIndex((index) => index + 1);
      setCounter(preparingDuration);
      setPreparing(true);
    } else {
      setTrainingFinished(true);
      playFinish();
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
      playWhistle();
      setCounter(currentExercise?.duration as number);
    }
    if (exerciseCounter === 0 && !isPreparing) {
      nextExercise();
    }
    if (exerciseCounter > 0 && exerciseCounter <= 3) {
      playBeep();
    }

    let timer: NodeJS.Timeout;
    if (!trainingFinished) {
      timer = setTimeout(() => {
        if (!isPaused) {
          setCounter((c) => c - 1);
        }
        setTotalTime((time) => time + 1);
      }, counterInterval);
    }

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

  return {
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
  };
}
