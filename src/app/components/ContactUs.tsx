import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ContactUs = () => {
  return (
    <div className="bg-red-200 flex flex-col justify-center items-center h-screen">
      <div className="text-3xl text-center font-bold m-4 p-4 bg-red-300 mb-4 w-full">
        Contact Us
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-4">
        <div className="lg:w-1/2 xl:w-1/2  p-4 m-2">
          <img
            src="/images/Contact.png"
            width="600"
            height="650"
            className="p-4 m-2"
          ></img>
        </div>
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
  );
};

export default ContactUs;
