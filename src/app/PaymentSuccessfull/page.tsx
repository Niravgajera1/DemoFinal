import React from "react";

const Successfull = () => {
  return (
    <div className="bg-zinc-300 h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <figure>
          <img src="/images/Success.gif" width={384} height={200} />
        </figure>
        <div className="card-normal">
          <p className="card-title justify-center m-2 p-2 text-2xl">
            Payment Successfully
          </p>
          <p className="justify-center">
            Thank you so much for your donation. ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Successfull;
