"use client";
import React from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";
import Link from "next/link";
import createCampaign from "./CreateCampaign/page";
import { Provider } from "react-redux";
import store from "./Redux/store";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col h-screen">
      <Provider store={store}>
        <Navbar />
      </Provider>
      <div className="flex flex-col justify-center items-center flex-grow bg-red-200 sm:px-4">
        <h4 className="font-black text-5xl mb-4">FundFusion</h4>
        <p className="text-xl mb-8">
          Your Home for Turning Ideas into Reality!
        </p>
        <div className="flex justify-center items-center">
          <Link
            href="/main"
            className="bg-sky-700 text-white py-4 px-8 rounded-lg text-center hover:bg-sky-600 hover:text-stone-800 transition duration-300"
          >
            <button className="text-xl">Get Started</button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Home;
