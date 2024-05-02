"use client";
import React from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ContactUs from "./components/ContactUs";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-y-auto justify-center">
      <div className="flex flex-col justify-center items-center flex-grow bg-red-200 sm:px-4 p-10 h-screen">
        <h4 className="font-black text-5xl mb-4 mt-10">FundFusion</h4>
        <p className="text-xl mb-8 text-center">
          Your Home for Turning Ideas into Reality!
        </p>
        <div className="flex justify-center items-center mb-8">
          <Link
            href="/main"
            className="bg-sky-700 text-white py-4 px-8 rounded-lg text-center hover:bg-sky-600 hover:text-stone-800 transition duration-300"
          >
            <button className="text-xl">Get Started</button>
          </Link>
        </div>
      </div>

      <ContactUs />
    </main>
  );
};

export default Home;
