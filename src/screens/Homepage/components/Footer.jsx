import React from 'react'
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper
    elevation={1}
    sx={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      textAlign: "center",
      padding: 2,
      backgroundColor: "#f8f9fa",
    }}
    
  >
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} Docia. Created By Yash.
    </Typography>
  </Paper>
  )
}

export default Footer;
