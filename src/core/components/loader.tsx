import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';

export const Loader = React.memo(function Loader() {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});
