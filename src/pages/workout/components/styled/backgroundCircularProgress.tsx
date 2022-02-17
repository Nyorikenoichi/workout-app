import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { Theme } from '../../../../core/style/mainTheme';

export const BackgroundCircularProgress = styled(CircularProgress)`
  position: absolute;
  left: 0;
  color: ${(props: { theme: Theme }) => props.theme.colors.workoutSpinnerBar};
`;
