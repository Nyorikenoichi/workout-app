import { Typography } from '@mui/material';
import styled from 'styled-components';
import { devices } from '../../../../../core/style/devices';
import { Theme } from '../../../../../core/style/mainTheme';

export const FinishDescription = styled(Typography)`
  margin-bottom: 30px;
  font-size: 20px;
  text-align: center;
  color: ${(props: { theme: Theme }) => props.theme.colors.lightText};

  @media ${devices.mobileL} {
    font-size: 18px;
  }
`;
