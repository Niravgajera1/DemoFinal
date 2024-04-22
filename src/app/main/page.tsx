"use client";
import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/CardComponet";
import { Provider } from "react-redux";
import store from "../Redux/store";

const main: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
      </Provider>
      <div className="bg-gray-200">
        <div className="flex flex-wrap  justify-center mx-2 md:mx-auto md:max-w-screen-lg lg:max-w-screen-xl ">
          <Card />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default main;
