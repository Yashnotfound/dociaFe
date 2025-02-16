import React from "react";
import { useSearchParams } from "react-router-dom";
import ResetPasswordView from "./ResetPasswordView";
import { resetPassword } from "../containers/resetPassword";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <div>Invalid or missing token.</div>;
  }

  const logic = resetPassword(token);

  return <ResetPasswordView {...logic} />;
};

export default ResetPasswordPage;
