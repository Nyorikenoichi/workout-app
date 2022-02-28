import styled from 'styled-components';
import DoneIcon from '@mui/icons-material/Done';
import { Theme } from '../../../../../core/style/mainTheme';

export const FinishIcon = styled(DoneIcon)`
  color: ${(props: { theme: Theme }) => props.theme.colors.workoutSpinnerBar};
  font-size: 80px;
  margin-top: 100px;
`;
