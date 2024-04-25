"use client";
import React from "react";
import Footer from "../components/footer";
import Card from "../components/CardComponet";
import { Provider } from "react-redux";
import store from "../Redux/store";
import Navbar from "../components/navbar";

const main: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <div className="bg-gray-200">
          <div className="flex flex-col p-2  justify-center mx-2 md:mx-auto md:max-w-screen-lg lg:max-w-screen-xl ">
            <Card />
          </div>
        </div>
        <Footer />
      </Provider>
    </>
  );
};

export default main;
