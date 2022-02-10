import * as React from 'react';
import { Box } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import { ProgressContainer } from './styled/progressContainer';
import { ProgressValue } from './styled/progressValue';
import { BackgroundCircularProgress } from './styled/backgroundCircularProgress';
import { MainCircularProgress } from './styled/mainCircularProgress';

interface ProgressProps {
  progressValue: number;
  displayValue: number;
  isPaused: boolean;
}

const Reversed = styled.div`
  transform: scale(-1, 1);
`;

export function Progress({
  progressValue,
  displayValue,
  isPaused,
}: ProgressProps) {
  return (
    <ProgressContainer>
      <Box sx={{ position: 'relative' }}>
        <Reversed>
          <BackgroundCircularProgress
            variant="determinate"
            size={128}
            thickness={3}
            value={100 - progressValue}
          />
        </Reversed>
        <MainCircularProgress
          variant="determinate"
          value={progressValue}
          size={128}
          thickness={3}
        />
      </Box>

      <ProgressValue variant="caption">
        {`${displayValue < 10 ? '0' : ''}${displayValue}`}
      </ProgressValue>
    </ProgressContainer>
  );
}
