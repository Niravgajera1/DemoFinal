"use client";

import React, { useState } from "react";
import Navbar from "./navbar";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import Footer from "./footer";

const SingInForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);

    setFormData((pre) => ({ ...pre, [name]: value }));
    console.log(formData);
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

      if (!res.ok) {
        throw new Error("Login failed");
      }
      const data = await res.json();
      const jwt = data.token;
      document.cookie = `jwt=${jwt}; path=/`;
      console.log(data);
      alert(data.message);
      router.push("/main");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-slate-400 ">
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
              className="w-full mt-4 bg-blue-600 hover:bg-blue-400 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              SignIn
            </button>
            <p className="mt-2">Forgot your password?</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingInForm;
