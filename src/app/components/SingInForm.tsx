"use client";

import React, { useState } from "react";
import Navbar from "./navbar";

import { useRouter } from "next/navigation";

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
      alert(data.message);
      router.push("/main");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-blue-300 ">
        <div className="max-w-md w-full p-6 bg-greay rounded-lg shadow-md backdrop-blur-xm bg-black/30">
          <form onSubmit={HandleSubmit}>
            <label
              htmlFor="UserEmail"
              className="block text-white text-xm font-bold mb-1"
            >
              UserEmail
            </label>
            <input
              required
              placeholder="Enter UserEmail"
              name="email"
              value={formData.email}
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
              required
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="Password"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <button
              className=" cursor-progress bg-blue-500 hover:bg-blue-650 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingInForm;
