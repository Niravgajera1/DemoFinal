"use client";
import toastFunction from "@/utils/toastUtils";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const resetPass: React.FC<{ params: { token: any } }> = ({
  params,
}: {
  params: { token: string };
}) => {
  const resetToken = params.token[0];

  //console.log(params, ">>>");

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    reset_token: resetToken,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toastFunction("warning", "pasword does not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/resetPassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const Resdata = await res.json();
      if (!res.ok) {
        toastFunction("error", Resdata.message);
      }
      if (res.ok) {
        toastFunction("success", Resdata.message);
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
        <h1 className="text-3xl font-semibold"> RESET PASSWORD </h1>
        <p>Enter The Details To Reset Your Password</p>
        <div className="responsive mx-2 my-6  m-2 bg-white/60 rounded-lg flex w-1/3 flex-col items-center justify-center ">
          <form className="mx-8 my-8" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              name="password"
              type="password"
              value={data.password}
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
              value={data.confirmPassword}
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

export default resetPass;
