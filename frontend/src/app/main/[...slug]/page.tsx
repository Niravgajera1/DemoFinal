import React from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const CampaignDetail: React.FC<{ params: Params }> = ({
  params,
}: {
  params: { slug: string };
}) => {
  const id = params.slug[0];
  console.log();
  return (
    <>
      <div className="justify-center item-center bg-slate-300 mt-2 p-4">
        <Navbar />
        <div className="flex flex-row justify-items-start bg-white/40 m-2">
          <img
            className="m-2 p-2"
            width="650px"
            height="600px"
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
          <div className="flex flex-row m-2 p-2 w-650 bg-white/50 h-scren w-screen justify-items-center">
            hello
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CampaignDetail;
