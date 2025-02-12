
import { useState, useEffect } from "react";
import { lookInSession } from "./session";

const useUserAuth = () => {
  const [userAuth, setUserAuth] = useState({});

  // On component mount, check session for user data
  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ accessToken: null });
    }
  }, []);

  return {
    userAuth,
    setUserAuth
  };
};

export default useUserAuth;
