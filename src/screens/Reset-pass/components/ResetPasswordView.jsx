import React from "react";
import { Container, Paper, Box, TextField, Button, Typography } from "@mui/material";

const ResetPasswordView = ({ 
  password, 
  confirmPassword, 
  loading, 
  error, 
  setPassword, 
  setConfirmPassword, 
  handleSubmit 
}) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Enter your new password below.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Reset Password"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordView;
