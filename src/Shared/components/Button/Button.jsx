import React from 'react';
import DefaultButton from '@mui/material/Button';

const Button = ({
  children,
  label,
  onClick,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  startIcon,
  endIcon,
  sx = {},
  ...props
}) => {
  return (
    <DefaultButton
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{ ...sx }}
      {...props}
    >
      {label ||children}
    </DefaultButton>
  );
};

export default Button;
