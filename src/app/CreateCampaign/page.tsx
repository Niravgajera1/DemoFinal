"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { campaingshemas } from "./Campaign.Schema";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialValues = {
  yourname: "",
  title: "",
  category: "",
  story: "",
  goal: "",
  enddate: "",
  image: "",
};

const createCampaign = () => {
  // const [data, setData] = useState({
  //   yourname: "",
  //   title: "",
  //   category: "",
  //   story: "",
  //   goal: "",
  //   enddate: "",
  //   image: "",
  // });
  const currentDate = new Date().toISOString().split("T")[0];
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: campaingshemas,
    onSubmit: async (values) => {
      //e.preventDefault();
      console.log(values);
      const formData = new FormData();
      formData.append("yourname", values.yourname);
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("story", values.story);
      formData.append("goal", values.goal);
      formData.append("enddate", values.enddate);
      formData.append("image", values.image);
      // const { yourname, title, category, story, goal, enddate, image } = data;

      try {
        const res = await fetch("http://localhost:3001/campaign/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer ${token}",
          },
          body: formData,
        });
        const data = await res.json();
        alert(data.message);
        // if (!res.ok) {
        //   throw new Error("Failed to post");
        // }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

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
                  value={values.yourname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="yourname"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Your Name"
                  variant="filled"
                  color="info"
                />
                <p className="text-red-500">{errors.yourname}</p>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="title"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Campaign Title "
                  variant="filled"
                  color="info"
                />
                <p className="text-red-500">{errors.title}</p>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="category"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Campaign Category"
                  variant="filled"
                  color="info"
                />
                <p className="text-red-500">{errors.category}</p>
              </div>
            </div>
            <div className="relative w-full min-w-[200px] font-black mt-4 mb-6">
              <TextField
                value={values.story}
                onChange={handleChange}
                onBlur={handleBlur}
                name="story"
                multiline
                size="small"
                fullWidth
                id="outlined-basic"
                label="Enter Campaign Story"
                variant="filled"
                color="info"
              />
              <p className="text-red-500 font-normal">{errors.story}</p>
            </div>
            <div className="relative flex flex-row gap-10 items-center justify-center mt-4 mb-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={values.goal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="goal"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Goal Amount"
                  variant="filled"
                  color="info"
                />
                <p className="text-red-500">{errors.goal}</p>
              </div>
              <div className="relative  w-full min-w-[200px]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="enddate" // Set the name attribute to match the field name
                      value={dayjs(values.enddate)}
                      onChange={(date) =>
                        handleChange({
                          target: { name: "enddate", value: date },
                        })
                      }
                      label="Select End Date"
                      minDate={dayjs(currentDate)}
                      format="DD-MM-YYYY"
                    />
                    <p className="text-red-500">{errors.enddate}</p>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="relative h-11 w-full min-w-[200px] justify-items mt-2 mb-4">
              <div className="relative w-full min-w-[200px]">
                {/* <TextField
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="image"
                  type="file"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label=""
                  variant="filled"
                  color="info"
                /> */}
                <input
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="image"
                  type="file"
                ></input>
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
