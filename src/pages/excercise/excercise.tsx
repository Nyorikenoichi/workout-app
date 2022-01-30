import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainRoutes from '../../core/constants/mainRoutes';

export default function Exercise() {
  return (
    <Typography>
      <Link to={MainRoutes.main}>back to main</Link>
    </Typography>
  );
}
