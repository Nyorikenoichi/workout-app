import { Typography } from '@mui/material';
import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const HeaderTitle = styled(Typography)`
  flex-grow: 1;

  @media ${devices.tablet} {
    font-size: 40px;
  }
`;
