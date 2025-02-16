import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../App";

const heroSectionLogic = () => {
  const { userAuth } = useContext(UserContext);
  const isLoggedIn = userAuth?.accessToken;
  const isAdmin = isLoggedIn && userAuth.role === "ADMIN";

  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem("selectedTab");
    if (stored) return stored;
    if (isAdmin) return "pending";
    if (isLoggedIn) return "user";
    return "general";
  });

  useEffect(() => {
    if (!isLoggedIn && (value === "user"|| value === "all-docs")) {
      setValue("general");
      localStorage.setItem("selectedTab", "general");
    }
  }, [isLoggedIn]);

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue);
  };

  return { value, tabChangeHandler };
};

export default heroSectionLogic;
