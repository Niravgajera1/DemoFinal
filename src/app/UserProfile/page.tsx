import React from "react";
import Navbar from "@/app/components/navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
        <div className="flex items-center justify-center bg-white/70 ">
          <label htmlFor="Name">Name</label>
          <input disabled></input>
        </div>
      </div>
    </>
  );
};

export default Profile;
