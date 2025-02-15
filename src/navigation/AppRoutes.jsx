// src/AppRoutes.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes/routes";
import { PublicLayout, PrivateLayout } from "../Layouts/index";
import Navbar from "../screens/Navbar";
import AnimationWrapper from "./hoc/page-animation";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AnimationWrapper />
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateLayout />}>
          {privateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
