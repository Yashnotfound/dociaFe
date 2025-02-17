import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ label, ...props }) => {
  return (
    <MuiTextField 
      label={label} 
      variant="outlined" 
      fullWidth 
      {...props} 
    />
  );
};

export default TextField;
