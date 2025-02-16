// src/screens/Auth/containers/UserAuthScreenContainer.jsx
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userAuthLogic from "../containers/userAuthLogic"; // Your auth logic
import UserAuthScreenView from "../components/UserAuthScreen";
import { UserContext } from "../../../App";

const UserAuthScreenContainer = ({ type }) => {
  const { userAuth } = useContext(UserContext);
  const { userAuthThroughServer } = userAuthLogic();
  const isLogin = type.toLowerCase() === "login";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = isLogin ? "/login" : "/signup";

    // Regex validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const { username, email, password } = formData;

    if (!isLogin && username.length < 3) {
      return toast.error("Username must be at least 3 characters long");
    }
    if (!email || !emailRegex.test(email)) {
      return toast.error("Invalid email address");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be 6-20 characters long with a number, lowercase, and uppercase letter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  // If user is authenticated, redirect to home
  if (userAuth && userAuth.accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <UserAuthScreenView
      isLogin={isLogin}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default UserAuthScreenContainer;
