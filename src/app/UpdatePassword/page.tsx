"use client";

import toastFunction from "@/utils/toastUtils";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const UpdatePass = () => {
  const [password, setPassword] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(password, ">>>>>>>");
      const res = await fetch("http://localhost:3001/auth/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      });
      console.log(res);

      const data = await res.json();
      if (!res.ok) {
        toastFunction("error", data.message);
      }
      if (res.ok) {
        toastFunction("success", data.message);
        window.location.href = "/main";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold"> UPDATE PASSWORD </h1>
        <p>Enter The Details To Update Your Password</p>
        <div className="responsive mx-2 my-6  m-2 bg-white/60 rounded-lg flex w-1/3 flex-col items-center justify-center ">
          <form className="mx-8 my-8" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              name="email"
              value={password.email}
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
              name="currentPassword"
              type="password"
              value={password.currentPassword}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter Current Password"
            />
            <TextField
              margin="normal"
              name="newPassword"
              type="password"
              value={password.newPassword}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter New Password"
            />
            <TextField
              margin="normal"
              name="confirmPassword"
              type="password"
              value={password.confirmPassword}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter Confirm Password"
            />
            <button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePass;
