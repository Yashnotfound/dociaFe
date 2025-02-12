// src/hooks/useUserNavigation.js
import { useContext } from "react";
import { UserContext } from "../../App";
import { removeFromSession } from "../../utils/session";

const useUserNavigation = () => {
  const { userAuth: { username, role }, setUserAuth } = useContext(UserContext);

  // Function to log out the user
  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return {
    username,
    role,
    signOutUser
  };
};

export default useUserNavigation;
