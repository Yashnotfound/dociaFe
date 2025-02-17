import React from 'react';
import { Container as MuiContainer } from '@mui/material';

const Container = ({ children, ...props }) => {
  return <MuiContainer {...props}>{children}</MuiContainer>;
};

export default Container;
