import Homepage from "../screens/Homepage";
import AuthScreen from "../screens/Auth";
import CreateDocumentPage from "../screens/CreateDoc";
import DocumentViewerPage from "../screens/DocumentViewer";
import EditDocumentPage from "../screens/EditDoc";
import ForgotPasswordPage from "../screens/Forgot-pass";
import ResetPasswordPage from "../screens/Reset-pass";

// Public routes (available to everyone)
export const publicRoutes = [
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <AuthScreen type="login" /> },
  { path: "/signup", element: <AuthScreen type="signup" /> },
  { path: "documents/:id", element: <DocumentViewerPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "*", element: <Homepage /> },
];

// Private routes (only accessible when authenticated)
export const privateRoutes = [
  { path: "documents/doc/create", element: <CreateDocumentPage type="GENERAL" /> },
  { path: "documents/api-contract/create", element: <CreateDocumentPage type="API_CONTRACT" /> },
  { path: "documents/edit/:id", element: <EditDocumentPage/> },
];