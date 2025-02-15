import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../App";

export const PrivateLayout = () => {
    const { userAuth } = useContext(UserContext);
    return userAuth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
  };