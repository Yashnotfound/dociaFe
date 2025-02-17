import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography = ({ children, ...props }) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};

export default Typography;