import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { callAPI } from "../../../Shared/utils/api";

export const resetPassword = (token) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if(passwordRegex.test(password) === false) {
      setError("Password must be 6-20 characters long with a number, lowercase, and uppercase letter");
      toast.error("Password must be 6-20 characters long with a number, lowercase, and uppercase letter");
      return;
    }
    
    setLoading(true);
    try {
      const payload = { token, password };
      await callAPI({
        method: "POST",
        path: "auth/reset-password",
        payload,
      });
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Failed to reset password.");
      toast.error("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    loading,
    error,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
