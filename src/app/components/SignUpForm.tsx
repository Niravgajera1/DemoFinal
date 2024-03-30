"use client";
import React, { useState } from "react";
import bg from "./../../../public/images/banner-bg.8e3818308ba8e86b1d87.png";
import Navbar from "./navbar";

const SignUpForm: React.FC = () => {
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
    // e.preventDefault();
    // PostData(e, User);
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

      if (!res.ok) {
        throw new Error("Failed to post data");
      }

      const data = await res.json();

      console.log(data); // Handle the response data here
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

  // const PostData = async (e: React.FormEvent<HTMLFormElement>, User: User) => {
  // e.preventDefault();
  // const { name, email, password, confirmpassword } = User;
  // try {
  //   const res = await fetch("http://localhost:3001/auth/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //       confirmpassword,
  //     }),
  //   });

  //   if (!res.ok) {
  //     throw new Error("Failed to post data");
  //   }

  //   const data = await res.json();

  //   console.log(data); // Handle the response data here
  // } catch (error) {
  //   console.error("Error posting data:", error);
  // }
  // };

  return (
    <>
      <Navbar />
      <div
        className="flex justify-center items-center h-screen "
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="max-w-md w-full p-6 bg-greay rounded-lg shadow-md backdrop-blur-xm bg-black/30">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="block text-white text-xm font-bold mb-1"
            >
              UserName
            </label>
            <input
              required
              name="name"
              value={User.name}
              onChange={handleChange}
              placeholder="Enter UserName"
              type="text"
              className="appearance-none border-3 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <label
              htmlFor="UserEmail"
              className="block text-white text-xm font-bold mb-1"
            >
              UserEmail
            </label>
            <input
              placeholder="Enter UserEmail"
              name="email"
              value={User.email}
              onChange={handleChange}
              type="text"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blackfocus:shadow-outline my-2 -4"
            ></input>
            <label
              htmlFor="Password"
              className="block text-white text-xm font-bold mb-1"
            >
              Password
            </label>
            <input
              placeholder="Enter Password"
              name="password"
              value={User.password}
              onChange={handleChange}
              type="Password"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <label
              htmlFor="Password"
              className="block text-white text-xm font-bold mb-1"
            >
              ConfirmPassword
            </label>
            <input
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              value={User.confirmpassword}
              onChange={handleChange}
              type="Password"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <button
              className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
