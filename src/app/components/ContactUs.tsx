import React from "react";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ContactUs = () => {
  return (
    <>
      <div className="responsive justify-center items-center  bg-slate-300  p-4 h-screen">
        <Divider className="mt-16 text-3xl font-semibold">Contact Us</Divider>
        <div className="responsive mx-8 my-24 bg-white/50 m-2 rounded-lg flex flex-col items-center justify-center ">
          <div className="responsive card lg:card-side flex flex-row  gap-14 justify-between">
            <img
              className="m-4 p-4 w-full lg:w-1/2"
              src="/images/Contact.png"
              alt="Campaign Image"
            />
            <form
              className="lg:w-1/2 xl:w-1/2 p-2 flex flex-col justify-center items-center m-3"
              action="https://formcarry.com/s/Mc2CYx6LzHt"
              method="POST"
            >
              <TextField
                margin="normal"
                name="name"
                style={{ width: "50%" }}
                required
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Enter Your Name"
                className="lg:w-1/2 xl:w-1/2"
              />
              <TextField
                margin="normal"
                name="Email"
                style={{ width: "50%" }}
                required
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Enter Your Email"
                className="lg:w-1/2 xl:w-1/2"
              />
              <TextField
                margin="normal"
                name="message"
                style={{ width: "50%" }}
                multiline
                minRows={4}
                required
                size="small"
                id="outlined-basic"
                variant="outlined"
                label="Enter Your Message"
                className="lg:w-1/2 xl:w-1/2"
              />
              <Button
                className="mt-4 lg:w-1/2 xl:w-1/2 "
                variant="outlined"
                endIcon={<SendIcon />}
                type="submit"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>

    // <div className="bg-slate-300 flex flex-col justify-center items-center h-screen">
    // {
    /* <div className="text-3xl text-center font-bold  w-full">Contact Us</div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-4">
        <div className="lg:w-1/2 xl:w-1/2  p-4 m-2">
          <img
            src="/images/Contact.png"
            width="600"
            height="650"
            className="p-4 m-2"
          ></img>
        </div>
      
      </div> */
    // }
    // </div>
  );
};

export default ContactUs;
