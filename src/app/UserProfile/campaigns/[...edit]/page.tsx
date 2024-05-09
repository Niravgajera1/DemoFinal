"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UploadButton } from "@/utils/uploadthing";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toastFunction from "@/utils/toastUtils";
import { ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";

interface formdata {
  yourname: string;
  title: string;
  category: string;
  story: string;
  goal: string;
  useremail: string;
  enddate: string; // Assuming the server expects date in string format
  image: string;
}

const Edit: React.FC<{ params: { edit: string } }> = ({
  params,
}: {
  params: { edit: string };
}) => {
  const id = params.edit[0];
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    yourname: "",
    useremail: "",
    title: "",
    category: "",
    story: "",
    goal: "",
    enddate: "",
    image: "",
  });
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      setFormdata({
        yourname: data.yourname || "",
        title: data.title || "",
        useremail: data.useremail || "",
        category: data.category || "",
        story: data.story || "",
        goal: data.goal || "",
        enddate: data.enddate || "",
        image: data.image || "",
      });
    } catch (error) {
      alert("Failed to fetch : ");
    }
  };

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const inputDatechange = (date: any) => {
    const formteDate = date.format("DD-MM-YYYY");
    setFormdata((prevData) => ({
      ...prevData,
      enddate: formteDate,
    }));
  };

  const handleFileChange = (imageUrl: string) => {
    setFormdata((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const getTokenFromCookie = () => {
      const cookies = parseCookies();
      setToken(cookies["token"]);
    };

    getTokenFromCookie();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const updateData = await response.json();
      if (!response.ok) {
        toastFunction("warning", updateData.message);
      }
      if (response.ok) {
        toastFunction("success", updateData.message);
        await router.push("/UserProfile/campaigns");
      }
    } catch (error) {
      console.error("failed to update ::::", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col  justify-center items-center h-screen bg-slate-300">
        <div className="flex flex-col gap-6 justify-center items-center p-6 rounded-lg shadow-xl backdrop-blur-xm bg-white/70">
          <div className="bg-zinc-400 flex flex-col justify-center p-1/2 rounded-lg ">
            <h4 className="justify-center m-2 p-2 text-2xl font-semibold">
              Edit Your Campaign!
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" relative flex flex-row gap-5 items-center justify-center mt-4 mb-10">
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={formdata.yourname}
                  onChange={handleInputchange}
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
                  value={formdata.title}
                  onChange={handleInputchange}
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
                  value={formdata.category}
                  onChange={handleInputchange}
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
                value={formdata.story}
                onChange={handleInputchange}
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
            <div className="relative flex flex-row gap-5 items-center justify-center mt-4 mb-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={formdata.goal}
                  onChange={handleInputchange}
                  name="goal"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter Goal Amount"
                  variant="filled"
                  color="info"
                />
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <TextField
                  value={formdata.useremail}
                  onChange={handleInputchange}
                  name="useremail"
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Enter User Email"
                  variant="filled"
                  color="info"
                />
              </div>
              <div className="relative  w-full min-w-[200px]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="enddate" // Set the name attribute to match the field name
                      value={dayjs(formdata.enddate)}
                      onChange={inputDatechange}
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
            <button
              className="w-full mt-2 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-blue-400 rounded-2xl"
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

export default Edit;
