"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";

const createCampaign = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <Navbar />

      <div className="flex flex-col  justify-center items-center h-screen bg-slate-400">
        <div className="flex flex-col gap-6 justify-center items-center p-6 rounded-lg shadow-xl backdrop-blur-xm bg-black/30">
          <div className="bg-zinc-400 flex flex-col justify-center p-1/2 rounded-lg ">
            <h4 className="justify-center m-2 p-2 text-2xl font-semibold">
              Create A Campaign!
            </h4>
          </div>
          <div className=" relative flex flex-row gap-5 items-center justify-center">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="yourname"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Email"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="relative w-full min-w-[200px]">
            <textarea>Campaign</textarea>
          </div>
          <div className="flex flex-row gap-2  items-center justify-center">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Email"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default createCampaign;
