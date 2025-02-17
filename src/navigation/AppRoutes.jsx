// src/AppRoutes.js
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../routes/routes";
import { PublicLayout, PrivateLayout } from "../Layouts";
import Navbar from "../screens/Navbar";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Toaster />
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route element={<PublicLayout />}>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
