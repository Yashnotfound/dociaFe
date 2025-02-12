import React from 'react'
import {Paper, Typography } from "@mui/material";

const Header = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 5, flexGrow: 1 }}>
    <Typography variant="h3" align="center" fontFamily={"-moz-initial"}>
      Manage your docs with Docia
    </Typography>
  </Paper>
  )
}

export default Header
