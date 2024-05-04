"use client";
import React from "react";

import Card from "../components/CardComponet";

const main: React.FC = () => {
  return (
    <>
      <div className="">
        <div className="flex flex-col p-2  justify-center mx-2 md:mx-auto md:max-w-screen-lg lg:max-w-screen-xl ">
          <Card />
        </div>
      </div>
    </>
  );
};

export default main;
