// src/App.js
import React, { createContext } from "react";
import userauthLogic from "./screens/Auth/containers/sessionStoreUser";
import AppRoutes from "./navigation/AppRoutes";

export const UserContext = createContext({});

const App = () => {
  const { userAuth, setUserAuth } = userauthLogic();

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;
