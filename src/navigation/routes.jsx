import React, { lazy } from "react";

const Homepage = lazy(() => import("../screens/Homepage"));
const AuthScreen = lazy(() => import("../screens/Auth"));
const CreateDocumentPage = lazy(() => import("../screens/CreateDoc"));
const DocumentViewerPage = lazy(() => import("../screens/DocumentViewer"));
const EditDocumentPage = lazy(() => import("../screens/EditDoc"));
const ForgotPasswordPage = lazy(() => import("../screens/Forgot-pass"));
const ResetPasswordPage = lazy(() => import("../screens/Reset-pass"));

export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <AuthScreen type="login" /> },
  { path: "/signup", element: <AuthScreen type="signup" /> },
  { path: "/documents/:id", element: <DocumentViewerPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
];

export const privateRoutes = [
  { path: "/documents/doc/create", element: <CreateDocumentPage type="GENERAL" /> },
  { path: "/documents/api-contract/create", element: <CreateDocumentPage type="API_CONTRACT" /> },
  { path: "/documents/edit/:id", element: <EditDocumentPage /> },
];
