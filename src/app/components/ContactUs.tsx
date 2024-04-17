import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import image from "./../../../public/images/Contact.png";

const ContactUs = () => {
  return (
    <div className="bg-red-200">
      <h1 className="text-3xl text-center font-bold m-4 p-4 bg-red-300 mb-4 ">
        Contact Us
      </h1>
      <div className="flex flex-row justify-center items-center width-1/2 gap-8 mb-4  ">
        <div>
          <img
            src={image.src}
            width="600"
            height="650"
            className="p-4 m-2"
          ></img>
        </div>
        <form
          className="p-2 flex flex-col justify-center items-center w-1/2"
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
          />
          <TextField
            margin="normal"
            name="message"
            className="rounded-xl"
            style={{ width: "50%" }}
            multiline
            minRows={4}
            required
            size="small"
            id="outlined-basic"
            variant="outlined"
            label="Enter Your Message"
          />
          <Button
            className="mt-4"
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
