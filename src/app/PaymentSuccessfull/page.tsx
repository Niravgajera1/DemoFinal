"use client";
import React from "react";

const Successfull = () => {
  const handlebackClick = () => {
    window.location.href = `/main/`;
  };
  return (
    <div className="bg-zinc-300 h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-2xl shadow-gray-500">
        <figure>
          <img src="/images/Success.gif" width={384} height={200} />
        </figure>
        <div className="card-normal">
          <p className="card-title justify-center m-2 p-2 text-2xl">
            Payment Successfully
          </p>
          <p className="mx-8">Thank you so much for your donation. ...</p>
        </div>
        <div className="card-actions justify-center">
          <button
            className="my-4 text-black font-semibold text-xl px-6 py-2 rounded-xl bg-transparent border border-blue-500 hover:bg-blue-400 hover:text-white hover:border-blue-500"
            onClick={handlebackClick}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Successfull;
