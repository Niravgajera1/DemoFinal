"use client";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log();
    e.preventDefault();
    const { name, email, password, confirmpassword } = User;
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmpassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        throw new Error("Failed to post data");
      }
      if (res.ok) {
        alert(data.message);
      }
      console.log(data); // Handle the response data here
      router.push("/signin");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  interface User {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
  }

  return (
    <>
      <Navbar />
      <div className="relative flex bg-slate-400 justify-center items-center h-screen ">
        <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-white/60 ">
          <div className="bg-zinc-400 flex flex-row  p-1/2 rounded-lg justify-items-center">
            <h4 className="p-3 font-bold text-black border-bottom border-3 border-success-subtle opacity-75 m ">
              Sign Up To Your Account
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              name="name"
              value={User.name}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter Your Name"
            />

            <TextField
              margin="normal"
              name="email"
              value={User.email}
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
              value={User.password}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter Your Password"
            />

            <TextField
              margin="normal"
              name="confirmpassword"
              value={User.confirmpassword}
              onChange={handleChange}
              required
              size="small"
              fullWidth
              id="outlined-basic"
              variant="filled"
              label="Enter Your Confirm password"
            />
            <button
              className="w-full mt-2 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Register
            </button>
            <p className="mt-2 justify-center">
              All Ready Have An Account ? {<Link href="/signin">SignIn</Link>}
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpForm;
