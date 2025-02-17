import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import callAPI from "../../../Shared/utils/api";

export const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);

    try {
      const payload = { email };
      await callAPI({
        method: "POST",
        path: "auth/forgot-password",
        payload,
      });
      toast.success("Password reset link sent to your email.");
      navigate("/login")
    } catch (error) {
      console.error("Error in forgot password:", error);
      toast.error("Email not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleSubmit,
  };
};
