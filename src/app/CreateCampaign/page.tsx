"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import TextField from "@mui/material/TextField";
import DatePicker from "@/app/components/Date";

const createCampaign = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col  justify-center items-center h-screen bg-slate-400">
        <div className="flex flex-col gap-6 justify-center items-center p-6 rounded-lg shadow-xl backdrop-blur-xm bg-white/30">
          <div className="bg-zinc-400 flex flex-col justify-center p-1/2 rounded-lg ">
            <h4 className="justify-center m-2 p-2 text-2xl font-semibold">
              Create A Campaign!
            </h4>
          </div>
          <div className=" relative flex flex-row gap-5 items-center justify-center">
            <div className="relative h-11 w-full min-w-[200px]">
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Your Name"
                variant="filled"
                color="info"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Campaign Title "
                variant="filled"
                color="info"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Campaign Category"
                variant="filled"
                color="info"
              />
            </div>
          </div>
          <div className="relative w-full min-w-[200px] font-black">
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Enter Campaign Story"
              variant="filled"
              color="info"
            />
          </div>
          <div className="flex flex-row gap-10 items-center justify-center">
            <div className="relative h-11 w-full min-w-[200px]">
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Goal Amount"
                variant="filled"
                color="info"
              />
            </div>
            <div className="relative  w-full min-w-[200px]">
              <DatePicker />
            </div>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <div className="relative w-full min-w-[200px]">
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Image"
                variant="filled"
                color="info"
              />
            </div>
          </div>
          <button className="bg-stone-700 text-white p-2 w-full rounded-lg text-center hover:border hover:bg-stone-600 hover:border-stone-700 hover:text-stone-800 transfrom duration-300">
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default createCampaign;
