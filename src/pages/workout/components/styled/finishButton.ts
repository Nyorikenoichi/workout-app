import { Button } from '@mui/material';
import { Theme } from 'src/core/style/mainTheme';
import styled from 'styled-components';

export const FinishButton = styled(Button)`
  width: 800px;
  height: 50px;
  margin-top: 35px;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.buttonsBackground};
  border-radius: 8px;
`;
