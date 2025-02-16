import React from "react";
import { Container, Paper, Box, TextField, Button, Typography } from "@mui/material";

const ForgotPasswordView = ({ email, setEmail, loading, handleSubmit }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Enter your email address below
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Reset Link"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordView;
