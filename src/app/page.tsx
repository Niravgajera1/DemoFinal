"use client";
import React from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ContactUs from "./components/ContactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <main className="flex flex-col min-h-screen overflow-y-auto justify-center">
        <div className="relative w-full h-screen overflow-hidden bg-black/65">
          {/* Carousel with reduced opacity */}
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            stopOnHover={false}
            dynamicHeight
            interval={1500}
            // transitionTime={500}
            className=" top-0 left-0 w-full h-full insert-0 opacity-35"
          >
            <div>
              <img
                src="/images/bgc1.jpg"
                alt="Slide 1"
                className="w-full h-screen "
              />
            </div>
            <div>
              <img
                src="/images/bgc2.jpg"
                alt="Slide 2"
                className="w-full h-screen "
              />
            </div>
            <div>
              <img
                src="/images/bgc3.jpg"
                alt="Slide 3"
                className="w-full h-screen "
              />
            </div>
            <div>
              <img
                src="/images/bgc4.jpg"
                alt="Slide 3"
                className="w-full h-screen   "
              />
            </div>
          </Carousel>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h4 className="font-black text-5xl mb-4 mt-10 text-center text-white font-mono">
              FundFusion
            </h4>
            <p className="text-2xl mb-8 text-center text-white font-serif">
              Your Home for Turning Ideas into Reality!
            </p>
            <div className="flex justify-center items-center mb-8">
              <Link
                href="/main"
                className="border-2 border-green  text-white py-4 px-8 rounded-lg text-center hover:bg-stone-700 hover:text-white transition duration-300"
              >
                <button className="text-2xl ">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
        <ContactUs />
      </main>
    </>
  );
};

export default Home;
