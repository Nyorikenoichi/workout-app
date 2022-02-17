import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styled from 'styled-components';
import { Theme } from '../../../../core/style/mainTheme';

export const PlayIcon = styled(PlayCircleIcon)`
  font-size: 50px;
  color: ${(props: { theme: Theme }) => props.theme.colors.buttonsBackground};
`;
