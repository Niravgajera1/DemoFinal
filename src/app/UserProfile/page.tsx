import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-300 h-screen flex flex-col justify-center items-center">
        <div className="flex items-center justify-center bg-white "></div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
