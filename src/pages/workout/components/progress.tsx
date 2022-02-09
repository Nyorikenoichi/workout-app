import * as React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { ProgressContainer } from './progressContainer';
import { ProgressValueContainer } from './progressValueContainer';

interface ProgressProps {
  progressValue: number;
  displayValue: number;
}

export function Progress({ progressValue, displayValue }: ProgressProps) {
  return (
    <ProgressContainer>
      <CircularProgress variant="determinate" value={progressValue} />
      <ProgressValueContainer>
        <Typography variant="caption" component="div" color="text.secondary">
          {displayValue}
        </Typography>
      </ProgressValueContainer>
    </ProgressContainer>
  );
}
