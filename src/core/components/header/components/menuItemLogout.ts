import { MenuItem } from '@mui/material';
import styled from 'styled-components';
import { Theme } from '../../../style/mainTheme';

export const MenuItemLogout = styled(MenuItem)`
  color: ${(props: { theme: Theme }) => props.theme.colors.buttonsBackground};
`;
