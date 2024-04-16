import React from "react";
import TextField from "@mui/material/TextField";
import image from "./../../../public/images/Contact.png";

const ContactUs = () => {
  return (
    <div className="bg-red-200">
      <div className="flex flex-row justify-center items-center width-1/2 gap-8">
        <div>
          <img
            src={image.src}
            width="600"
            height="650"
            className="p-4 m-2"
          ></img>
        </div>
        {/* <div className="flex flex-col justify-center "> */}
        <form className="p-2 flex flex-col justify-center items-center w-1/2">
          <TextField
            margin="normal"
            name="name"
            style={{ width: "50%" }}
            //   value={User.name}
            //   onChange={handleChange}
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
            //   value={User.name}
            //   onChange={handleChange}
            required
            size="small"
            id="outlined-basic"
            variant="outlined"
            label="Enter Your Email"
          />
          <TextField
            margin="normal"
            name="name"
            style={{ width: "50%" }}
            multiline
            //   value={User.name}
            //   onChange={handleChange}
            required
            size="small"
            id="outlined-basic"
            variant="outlined"
            label="Enter Your Message"
          />
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
