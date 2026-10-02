import React, { useRef } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/userAuthStore";
import { Loader } from "lucide-react";

const SignUpPage = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { signupAuth,isSigningUp } = userAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = email.current.value;
    const Username = username.current.value;
    const Pass = password.current.value;
    const data = {
      email: Email,
      fullName: Username,
      password: Pass,
    };
    signupAuth(data);
  };
   if (isSigningUp) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-17 animate-spin" />
      </div>
    );
  }
  return (
    <div id="main-parent-login">
      <div id="left-main-div">
        <div className="main-animation-div">
          <div id="helping-animation-div">
            Welcome to <p>Chatlly</p>
          </div>
        </div>
        <div className="text-animation">
          <div>
            <IoArrowBackSharp />
          </div>
        </div>
      </div>
      <div id="right-main-div">
        <form onSubmit={handleSubmit} className="form-login">
          <input type="text" placeholder="Provide your Name" ref={username} />
          <input type="email" placeholder="Provide email" ref={email} />
          <input
            type="password"
            placeholder="Provide password"
            ref={password}
          />
          <div className="flex gap-2 justify-center align-center">
            Already have account?{" "}
            <div
              id="goto-signup"
              style={{ color: "purple" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </div>
          </div>
          <button>Signup</button>
        </form>
      </div>

      <div id="helping-div"></div>
    </div>
  );
};

export default SignUpPage;