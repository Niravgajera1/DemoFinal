"use client"

import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const admin =() => {
  const [activetab, setActivetab] = useState<string>("Admin");

  const handleClick = (tabName: string) => {
    setActivetab(tabName);
  };
 
  return (
    <div>
      <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4 h-screen">
        <div className="responsive   mx-8 my-8 bg-white/40 px-4 py-4 rounded-lg">
          <div className="mx-32 my-12 flex flex-row px-2 text-xl">
            <span>
              <Link
               onClick={() => handleClick("Admin")}
                href="/admin"
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activetab === "Admin"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : "border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Admin
              </Link>
            </span>
            <span>
              <Link
               onClick={() => handleClick("Users")}
                href="/admin/users"
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activetab === "Users"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : "border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Users
              </Link>
            </span>
            <span>
              <Link
               onClick={() => handleClick("Campaigns")}
                href="/admin/campaigns"
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activetab === "Campaigns"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : "border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Campaigns
              </Link>
            </span>
          </div>
          <div className="">
            <Divider className="bg-gray-600" />
          </div>
          <div className="mx-32 mt-8 flex flex-row justify-between">
            <div className="my-6">
              <img
                src="/images/profice.jpg"
                style={{ height: "300px", width: "428px" }}
              />
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row">
                <img
                  className="rounded-full w-20"
                  alt="Tailwind CSS Navbar component"
                  src="/images/profice.jpg"
                />
                <div className="flex items-center pl-6 font-sans text-2xl font-semibold">
                  About Me
                </div>
              </div>
              <div className="flex flex-row mr-40">
                <img
                  src="/images/customer.png"
                  style={{ height: "40px", width: "40px" }}
                />
                <p className="px-2 text-3xl">
                  {/* {userData.createdCampaigns.length} */}
                </p>
                <p className="pt-2">Registed users</p>
              </div>
              <div className="flex flex-row mr-40">
                <img
                  src="/images/fund.png"
                  style={{ height: "40px", width: "40px" }}
                />
                <p className="px-2 text-3xl">
                  {/* //     {userData.contributedCampaigns.length} */}
                </p>
                <p className="pt-2">Created FundRaises</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default admin;
