import React from 'react';
import { Chip as MuiChip } from '@mui/material';

const Chip = ({
  label,
  color = 'default',
  size = 'small',
  sx = {},
  ...props
}) => {
  return (
    <MuiChip
      label={label}
      color={color}
      size={size}
      sx={{ ...sx }}
      {...props}
    />
  );
};

export default Chip;
