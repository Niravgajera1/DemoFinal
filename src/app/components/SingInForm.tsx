"use client";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./navbar";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Footer from "./footer";
import ForgotPassword from "./ForgotPassword";
import styles from "@/app/Styles/style.module.css";
import { login } from "./../Redux/slice/authSlice";
import { useDispatch } from "react-redux";

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
    console.log(formData);
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      }
      if (res.ok) {
        console.log("res : ", res);
        console.log("login Successfully");
        const current_user = data.user;
        console.log(current_user);
        await alert("login successfully");
        dispatch(login({ userId: data._id, user: current_user }));
        //    localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;
        window.location.href = "/main";
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
      <Navbar />

      <div className="flex justify-center items-center h-screen  bg-slate-400 ">
        <div className="max-w-md w-full p-6 bg-greay rounded-lg shadow-md backdrop-blur-xm bg-white/60">
          <div className="bg-zinc-400 flex flex-col justify-center p-1/2 rounded-lg ">
            <h4 className="justify-center p-3 text-xl font-semibold">
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
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
            <p className="mt-2 justify-center text-blue-600 hover:underline focus:outline-none">
              New At FundFusion ? {<Link href="/signup">SignUp</Link>}
            </p>
          </form>
        </div>
      </div>
      <Footer />
      {showForgotPassWord && (
        <ForgotPassword onClose={closeForgotPasswordPopup} />
      )}
    </div>
  );
};

export default SingInForm;
