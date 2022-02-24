import { Button } from '@mui/material';
import { devices } from 'src/core/style/devices';
import { Theme } from 'src/core/style/mainTheme';
import styled from 'styled-components';

export const StartWorkoutButton = styled(Button)`
  position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  width: 55%;
  margin: auto;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.buttonsBackground};
  box-shadow: 0 16px 32px rgba(170, 0, 255, 0.24);
  border-radius: 8px;

  @media ${devices.laptop} {
    width: 70%;
  }
  @media ${devices.mobileL} {
    width: 95%;
  }
`;
