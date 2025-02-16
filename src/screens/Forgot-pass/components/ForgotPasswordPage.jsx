import React from "react";
import ForgotPasswordView from "./ForgotPasswordView";
import { forgotPassword } from "../containers/forgotPassword";

const ForgotPasswordPage = () => {
  const { email, setEmail, loading, handleSubmit } = forgotPassword();

  return (
    <ForgotPasswordView 
      email={email} 
      setEmail={setEmail} 
      loading={loading} 
      handleSubmit={handleSubmit} 
    />
  );
};

export default ForgotPasswordPage;
