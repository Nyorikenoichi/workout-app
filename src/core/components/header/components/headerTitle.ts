import { Typography } from '@mui/material';
import { devices } from 'src/core/style/devices';
import styled from 'styled-components';

export const HeaderTitle = styled(Typography)`
  @media ${devices.mobileL} {
    font-size: 40px;
    width: 200px;
  }
`;
