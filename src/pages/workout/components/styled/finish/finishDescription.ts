import { Typography } from '@mui/material';
import styled from 'styled-components';
import { devices } from '../../../../../core/style/devices';

export const FinishDescription = styled(Typography)`
  margin-bottom: 30px;
  font-size: 20px;
  text-align: center;
  color: #222222;

  @media ${devices.mobileL} {
    font-size: 18px;
  }
`;
