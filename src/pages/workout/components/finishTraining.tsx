import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MainRoutes } from '../../../core/constants/mainRoutes';

interface FinishTrainingProps {
  time: number;
}

export function FinishTraining({ time }: FinishTrainingProps) {
  return (
    <>
      <Typography variant="h2">Workout Complete!</Typography>
      <Typography>
        Nice job. You’re done. Here’s the workout summary.
      </Typography>
      <Typography>{`Minutes: ${Math.round(time / 60)}`}</Typography>
      <Link to={MainRoutes.main}>
        <Button>Save & Continue</Button>
      </Link>
    </>
  );
}
