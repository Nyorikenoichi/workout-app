import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Theme } from '../../../../core/style/mainTheme';

export const ProgressValue = styled(Typography)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: ${(props: { theme: Theme }) => props.theme.colors.workoutSpinnerBar};
  font-size: 40px;
  font-weight: 600;
`;
