// src/components/UserAuthForm.js
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../../../utils/page-animation";
import InputBox from "../../../Shared/Components/InputBox";
import userAuthLogic from "../containers/userAuthLogic";
import { UserContext } from "../../../App";

const UserAuthScreen = ({ type }) => {
  const { userAuth } = useContext(UserContext);
  const { userAuthThroughServer } = userAuthLogic();
  const isLogin = type.toLowerCase() === "login";

  // State for input fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = isLogin ? "/login" : "/signup";

    // Regex validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const { username, email, password } = formData;

    // Validation checks
    if (!isLogin && username.length < 3) {
      return toast.error("Username must be at least 3 characters long");
    }
    if (!email || !emailRegex.test(email)) {
      return toast.error("Invalid email address");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be 6-20 characters long with a number, lowercase, and uppercase letter"
      );
    }

    // Send data to API via the hook
    userAuthThroughServer(serverRoute, formData);
  };

  return userAuth && userAuth.accessToken ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {isLogin ? "Welcome Back" : "Join Today"}
          </h1>

          {!isLogin && (
            <InputBox
              name="username"
              type="text"
              placeholder="User Name"
              icon="fi-rr-user"
              value={formData.username}
              onChange={handleChange}
            />
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            value={formData.email}
            onChange={handleChange}
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn-dark center mt-14" type="submit">
            {isLogin ? "Continue" : "Create Account"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          {isLogin ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-black">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already have an account?{" "}
              <Link to="/login" className="underline text-black">
                Log in
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthScreen;
