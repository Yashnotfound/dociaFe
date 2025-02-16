import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../App";

const heroSectionLogic = () => {
  const { userAuth } = useContext(UserContext);
  const isLoggedIn = !!userAuth?.accessToken;
  const isAdmin = isLoggedIn && userAuth.role === "ADMIN";

  const getInitialTab = () => {
    const stored = localStorage.getItem("selectedTab");
    if (stored) return stored;
    if (isAdmin) return "pending";
    if (isLoggedIn) return "user";
    return "general";
  };

  const [value, setValue] = useState(getInitialTab());

  useEffect(() => {
    const newValue = isAdmin ? "pending" : isLoggedIn ? "user" : "general";
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  }, [userAuth, isAdmin, isLoggedIn]);

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  return { value, tabChangeHandler };
};

export default heroSectionLogic;
