import { Button } from '@mui/material';
import { devices } from 'src/core/style/devices';
import { Theme } from 'src/core/style/mainTheme';
import styled from 'styled-components';

export const StartWorkoutButton = styled(Button)`
  position: fixed;
  bottom: 25px;
  width: 800px;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.colors.buttonsBackground};
  box-shadow: 0 16px 32px rgba(170, 0, 255, 0.24);
  border-radius: 8px;

  @media ${devices.laptop} {
    width: 700px;
  }
  @media ${devices.tablet} {
    width: 450px;
  }
  @media ${devices.mobileL} {
    width: 415px;
  }
  @media ${devices.mobileM} {
    width: 365px;
  }
  @media ${devices.mobileS} {
    width: 315px;
  }
`;
