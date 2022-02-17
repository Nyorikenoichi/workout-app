import styled from 'styled-components';
import { Button } from '@mui/material';
import { Theme } from 'src/core/style/mainTheme';

export const LogoutButton = styled(Button)`
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.buttonsBackground};
  border-radius: 8px;
`;
