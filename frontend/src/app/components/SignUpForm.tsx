"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

  // const { errors } = useFormik({
  //   validationSchema: signUpSchema,
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log();
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
      alert(data.message);
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
      <div
        className="relative flex bg-slate-400 justify-center items-center h-screen "
        // style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="max-w-md w-full p-6 rounded-lg shadow-md bg-white/30 ">
          <div className="bg-stone-500 flex flex-col  p-1/2 rounded-lg justify-center">
            <h4 className=" p-3 font-bold text-black border-bottom border-3 border-success-subtle opacity-75 m ">
              Sign Up To Your Account
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="block text-black text-xm font-bold  mt-2"
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
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            >
              {/* {<p className="form-error">{errors.name}</p>} */}
            </input>
            <label
              htmlFor="UserEmail"
              className="block text-black text-xm font-bold "
            >
              UserEmail
            </label>
            <input
              required
              placeholder="Enter UserEmail"
              name="email"
              value={User.email}
              onChange={handleChange}
              type="text"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blackfocus:shadow-outline my-2 -4"
            ></input>
            <label
              htmlFor="Password"
              className="block text-black text-xm font-bold "
            >
              Password
            </label>
            <input
              required
              placeholder="Enter Password"
              name="password"
              value={User.password}
              onChange={handleChange}
              type="Password"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <label
              htmlFor="Password"
              className="block text-black text-xm font-bold "
            >
              ConfirmPassword
            </label>
            <input
              required
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              value={User.confirmpassword}
              onChange={handleChange}
              type="Password"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline my-2 -4"
            ></input>
            <button
              className="bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpForm;
