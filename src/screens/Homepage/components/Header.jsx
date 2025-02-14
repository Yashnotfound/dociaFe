import React, { useContext } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { UserContext } from "../../../App";

const Header = () => {
  const { userAuth } = useContext(UserContext);
  const isAuthenticated = userAuth?.username;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        marginTop: 5,
        textAlign: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "bold" }}
        >
          👋 Welcome back, {userAuth.username}!
        </motion.div>
      )}

      {/* Main Title */}
      <Typography variant="h3" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
        Manage your Docs with <span style={{color: "#ffeb3b", fontSize: 30 }}>Docia</span>.
      </Typography>

      <Typography variant="subtitle1" sx={{ marginTop: 1, opacity: 0.9 }}>
        Seamlessly create, edit and share your documents.
      </Typography>
    </Paper>
  );
};

export default Header;
