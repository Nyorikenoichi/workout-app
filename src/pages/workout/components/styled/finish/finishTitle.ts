import { Typography } from '@mui/material';
import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const FinishTitle = styled(Typography)`
  font-size: 40px;
  font-weight: 600;

  @media ${devices.mobileL} {
    font-size: 28px;
  }
`;
