import React from 'react';
import { CircularProgress as MuiCircularProgress, Box } from '@mui/material';

const CircularProgress = (props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <MuiCircularProgress />
    </Box>
  );
};

export default CircularProgress;
