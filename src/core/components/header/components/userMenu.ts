import styled from 'styled-components';
import { Menu } from '@mui/material';
import { Theme } from '../../../style/mainTheme';

export const UserMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: ${(props: { theme: Theme }) =>
      props.theme.colors.userMenuBackground};
  }
`;
