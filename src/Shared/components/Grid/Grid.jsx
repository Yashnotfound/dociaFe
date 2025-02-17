import React from 'react';
import { Grid as MuiGrid } from '@mui/material';

const Grid = ({ children, ...props }) => {
  return <MuiGrid {...props}>{children}</MuiGrid>;
};

export default Grid;
