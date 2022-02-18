import * as React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { ProgressContainer } from './styled/progressContainer';
import { ProgressValue } from './styled/progressValue';
import { BackgroundCircularProgress } from './styled/backgroundCircularProgress';
import { MainCircularProgress } from './styled/mainCircularProgress';

interface ProgressProps {
  progressValue: number;
  displayValue: number;
}

const Reversed = styled.div`
  transform: scale(-1, 1);
`;

const progressSize = 128;
const progressThickness = 3;

export function Progress({ progressValue, displayValue }: ProgressProps) {
  const reversedProgress = 100 - progressValue;

  const showLeadingZero = (value: number): string => {
    return value < 10 ? '0' : '';
  };

  return (
    <ProgressContainer>
      <Box sx={{ position: 'relative' }}>
        <Reversed>
          <BackgroundCircularProgress
            variant="determinate"
            size={progressSize}
            thickness={progressThickness}
            value={reversedProgress}
          />
        </Reversed>
        <MainCircularProgress
          variant="determinate"
          value={progressValue}
          size={progressSize}
          thickness={progressThickness}
        />
      </Box>

      <ProgressValue variant="caption">
        {`${showLeadingZero(displayValue)}${displayValue}`}
      </ProgressValue>
    </ProgressContainer>
  );
}
