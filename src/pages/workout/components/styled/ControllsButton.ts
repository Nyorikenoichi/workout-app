import styled from 'styled-components';
import { Button } from '@mui/material';
import { Theme } from '../../../../core/style/mainTheme';

export const ControllsButton = styled(Button)`
  color: ${(props: { theme: Theme }) => props.theme.colors.buttonsBackground};
  border-color: ${(props: { theme: Theme }) =>
    props.theme.colors.buttonsBackground};
  border-radius: 8px;
`;
