import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import styled from 'styled-components';
import { Theme } from '../../../../core/style/mainTheme';

export const PauseIcon = styled(PauseCircleIcon)`
  font-size: 50px;
  z-index: 5;
  color: ${(props: { theme: Theme }) => props.theme.colors.buttonsBackground};
`;
