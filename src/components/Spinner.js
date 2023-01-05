import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const Spinner = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="subtitle1" component="p">
        Please wait..., loading...
      </Typography>
    </div>
  );
};

export default Spinner;
