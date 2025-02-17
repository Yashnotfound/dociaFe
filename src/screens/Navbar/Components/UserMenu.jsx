// src/components/UserMenu.js
import React from "react";
import { Link } from "react-router-dom";
import SidebarPanel from "./SidebarPanel";

const UserMenu = ({ userAuth, accessToken, username, userNavPanel, handleUserNavPanel, handleBlur }) => {
  return (
    <div>
      {userAuth && accessToken && username ? (

        <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
          <button className="w-12 h-12 mt-1">
            <i className="fi fi-rr-user"></i>
          </button>
          {userNavPanel && <SidebarPanel />}
        </div>
      ) : (

        <div className="flex gap-2">
          <Link className="btn-dark py-2 px-4 md:py-3 md:px-6" to="/login">
            Login
          </Link>
          <Link className="btn-light py-2 px-4 md:py-3 md:px-6 hidden md:block" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
