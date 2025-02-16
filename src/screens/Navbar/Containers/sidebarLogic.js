// src/hooks/useUserNavigation.js
import { useContext } from "react";
import { UserContext } from "../../../App";
import { removeFromSession } from "../../Auth/containers/session";

const useUserNavigation = () => {
  const { userAuth: { username, role }, setUserAuth } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
    localStorage.setItem("selectedTab", "general");
  };

  return {
    username,
    role,
    signOutUser,
  };
};

export default useUserNavigation;
