// src/containers/Navbar.js
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import navbarLogic from "../Containers/navbarLogic";
import { Typography } from "@mui/material";

const Navbar = () => {
  const { 
    userAuth, 
    accessToken, 
    username, 
    searchBoxVisibility, 
    toggleSearchBox, 
    userNavPanel, 
    handleUserNavPanel, 
    handleBlur 
  } = navbarLogic();

  return (
    <>
      <nav className="navbar z-50 backdrop-blur-md px-4 py-3 shadow-md flex items-center">
        {/* Logo */}
        <Link to="/" className="flex-col gap-2 h-12 mb-3">
          <img src={logo} alt="Logo" className="w-full mt-1" />
        <Typography variant="inherit" fontFamily={"fantasy"}>Docia</Typography>
        </Link>

        {/* Search Bar */}
        <SearchBar searchBoxVisibility={searchBoxVisibility} toggleSearchBox={toggleSearchBox} />

        {/* Navigation Links */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <Link to="/documents/doc/create" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write Doc</p>
          </Link>
          <Link to="/documents/api-contract/create" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-api"></i>
            <p>Generate API Contract</p>
          </Link>

          {/* User Menu */}
          <UserMenu 
            userAuth={userAuth}
            accessToken={accessToken}
            username={username}
            userNavPanel={userNavPanel}
            handleUserNavPanel={handleUserNavPanel}
            handleBlur={handleBlur}
          />
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
