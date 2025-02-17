import React from 'react';
import { Paper as MuiPaper } from '@mui/material';

const Paper = ({ children, ...props }) => {
  return <MuiPaper {...props}>{children}</MuiPaper>;
};

export default Paper;
