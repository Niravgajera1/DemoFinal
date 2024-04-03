import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/CardComponet";

const main: React.FC = () => {
  return (
    <>
      <div className="bg-slate-300">
        <Navbar />
        <div className="flex flex-wrap  justify-center mx-2 md:mx-auto md:max-w-screen-lg lg:max-w-screen-xl">
          <Card />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default main;
