"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

const createCampaign = () => {
  const [data, setData] = useState({
    yourname: "",
    title: "",
    category: "",
    story: "",
    goal: "",
    enddate: "",
    image: "",
  });
  const router = useRouter();
  const currentDate = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: any) => {
    const formateDate = date.format("DD-MM-YYYY");
    setData((prevData) => ({
      ...prevData,
      enddate: formateDate,
    }));
  };

  const handleFileChange = (imageUrl: string) => {
    setData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/campaign/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const Data = await res.json();
      if (res.ok) {
        alert(Data.message);
        await router.push("/main");
      } else {
        alert(Data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className=" relative flex flex-row gap-5 items-center justify-center mt-4 mb-10">
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  required
                  value={data.yourname}
                  onChange={handleChange}
                  name="yourname"
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
                  required
                  value={data.title}
                  onChange={handleChange}
                  name="title"
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
                  required
                  value={data.category}
                  onChange={handleChange}
                  name="category"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Campaign Category"
                  variant="filled"
                  color="info"
                />
              </div>
            </div>
            <div className="relative w-full min-w-[200px] font-black mt-4 mb-6">
              <TextField
                required
                value={data.story}
                onChange={handleChange}
                name="story"
                multiline
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Campaign Story"
                variant="filled"
                color="info"
              />
            </div>
            <div className="relative flex flex-row gap-10 items-center justify-center mt-4 mb-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  required
                  value={data.goal}
                  onChange={handleChange}
                  name="goal"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Goal Amount"
                  variant="filled"
                  color="info"
                />
              </div>
              <div className="relative  w-full min-w-[200px]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="enddate" // Set the name attribute to match the field name
                      value={dayjs(data.enddate)}
                      onChange={handleDateChange}
                      label="Select End Date"
                      minDate={dayjs(currentDate)}
                      format="DD-MM-YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="relative h-11 w-full min-w-[200px] justify-items mt-2 mb-4">
              <div className="relative w-full min-w-[200px]">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    if (res && res.length > 0) {
                      handleFileChange(res[0].url);
                    }
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </div>
            <button className="bg-stone-700 text-white p-2 w-full rounded-lg text-center hover:border hover:bg-stone-600 hover:border-stone-700 hover:text-stone-800 transfrom duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default createCampaign;
