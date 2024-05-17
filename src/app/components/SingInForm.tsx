"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./navbar";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Footer from "./footer";
import ForgotPassword from "./ForgotPassword";
import { login } from "./../Redux/slice/authSlice";
import { useDispatch } from "react-redux";
import toastFunction from "./../../utils/toastUtils";
import { ToastContainer } from "react-toastify";

const SingInForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassWord, setShowForgotPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        // alert(data.message);
        toastFunction("error", data.message);
      }
      if (res.ok) {
        const current_user = data.user;
        console.log(current_user, ">>>>>Current user");
        dispatch(login(current_user));
        await toastFunction("success", "Login Successfully");

        document.cookie = `token=${data.token}; path=/; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;

        setTimeout(() => {
          window.location.href = "/main";
        }, 1000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordPopup = () => {
    setShowForgotPassword(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4 h-screen">
        <div className="responsive mx-8 my-24 bg-white/50 m-2 rounded-lg flex-col items-center justify-center ">
          <div className="responsive card lg:card-side md:flex  ">
            <img
              className="m-2 p-2 w-full lg:w-1/2"
              width="650px"
              height="1200px"
              src="/images/login.png"
              alt="Campaign Image"
            />
            <div className="flex flex-col m-4 p-1/2  bg-white/50 h-full w-full lg:w-1/2 justify-items-center">
              <div className="card-body flex">
                <div className="bg-zinc-400 card-title flex flex-row  p-1/2 rounded-lg justify-items-center">
                  <h4 className="p-3 font-bold text-black border-bottom border-3 border-success-subtle opacity-75 ">
                    Welcome Again
                  </h4>
                </div>
                <form onSubmit={HandleSubmit}>
                  <TextField
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    variant="filled"
                    label="Enter Your Email"
                  />
                  <TextField
                    margin="normal"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    variant="filled"
                    label="Enter Your Password"
                  />
                  <button
                    className="w-full mt-2 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="submit"
                  >
                    SignIn
                  </button>
                  <p className="mt-2">
                    <button
                      type="button"
                      className="text-blue-600 hover:underline focus:outline-none"
                      onClick={handleForgotPasswordClick}
                    >
                      Forgot your password?
                    </button>
                  </p>
                  <p className="mt-2 justify-center  hover:underline focus:outline-none">
                    New At FundFusion ?
                    {
                      <Link href="/signup" className="text-blue-500">
                        SignUp
                      </Link>
                    }
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForgotPassWord && (
        <ForgotPassword onClose={closeForgotPasswordPopup} />
      )}
    </div>
  );
};

export default SingInForm;
