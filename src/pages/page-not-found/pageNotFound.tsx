import * as React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MainRoutes from '../../core/constants/mainRoutes';

export default function PageNotFound() {
  return (
    <div>
      <Typography variant="h4">Page not found</Typography>
      <Typography>
        Back to <Link to={MainRoutes.main}>main page</Link>
      </Typography>
    </div>
  );
}
