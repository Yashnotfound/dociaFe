import React, { lazy } from "react";

const Homepage = lazy(() => import("../screens/Homepage"));
const AuthScreen = lazy(() => import("../screens/Auth"));
const CreateDocument = lazy(() => import("../screens/CreateDoc"));
const DocumentViewer = lazy(() => import("../screens/DocumentViewer"));
const EditDocument = lazy(() => import("../screens/EditDoc"));
const ForgotPasswordPage = lazy(() => import("../screens/Forgot-pass"));
const ResetPasswordPage = lazy(() => import("../screens/Reset-pass"));

export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <AuthScreen type="login" /> },
  { path: "/signup", element: <AuthScreen type="signup" /> },
  { path: "/documents/:id", element: <DocumentViewer /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
];

export const privateRoutes = [
  { path: "/documents/doc/create", element: <CreateDocument type="GENERAL" /> },
  { path: "/documents/api-contract/create", element: <CreateDocument type="API_CONTRACT" /> },
  { path: "/documents/edit/:id", element: <EditDocument /> },
];
