// src/hooks/useNavbarLogic.js
import { useState, useContext } from "react";
import { UserContext } from "../../../App";

const navbarLogic = () => {
  // Authentication Data from Context
  const { userAuth, userAuth: { accessToken, username } = {} } = useContext(UserContext);

  // Search Box Visibility State
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(true);

  // User Navigation Panel State
  const [userNavPanel, setUserNavPanel] = useState(false);

  // Toggle search box visibility
  const toggleSearchBox = () => {
    setSearchBoxVisibility((prev) => !prev);
  };

  // Toggle User Navigation Panel
  const handleUserNavPanel = () => {
    setUserNavPanel((prev) => !prev);
  };

  // Hide user panel on blur
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return {
    userAuth,
    accessToken,
    username,
    searchBoxVisibility,
    toggleSearchBox,
    userNavPanel,
    handleUserNavPanel,
    handleBlur
  };
};

export default navbarLogic;
