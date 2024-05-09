"use client";
import { RootState } from "@/app/Redux/store";

import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Like = () => {
  const { likedCampaigns }: { likedCampaigns: object[] | null } = useSelector(
    (state: RootState) => state.user
  );

  console.log(likedCampaigns, ">>>>>");

  const [activetab, setActivetab] = useState<string>("LikedCampaigns");

  const handleClick = (tabName: string) => {
    setActivetab(tabName);
  };

  const { name }: { name: string | null } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <>
        <div className="responsive justify-center h-screen item-center  bg-slate-300 mt-2 p-4">
          <div className="responsive relative h-auto  mx-8 my-8 bg-white/40 px-4 py-4 rounded-lg">
            <div className="mx-32 pt-20 pb-10  px-2  font-semibold text-3xl font-sans ">
              {name}
            </div>
            <div className="mx-32 flex flex-row px-2 text-xl">
              <span>
                <Link
                  onClick={() => handleClick("Profile")}
                  href="/UserProfile"
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activetab === "Profile"
                      ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                      : "border-transparent text-dark-blue hover:text-saddle-brown"
                  }`}
                >
                  Profile
                </Link>
              </span>
              <span>
                <Link
                  onClick={() => handleClick("Campaigns")}
                  href="/UserProfile/campaigns"
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activetab === "Campaigns"
                      ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                      : "border-transparent text-dark-blue hover:text-saddle-brown"
                  }`}
                >
                  Campaigns
                </Link>
              </span>
              <span>
                <Link
                  onClick={() => handleClick("Contributions")}
                  href="/UserProfile/contributaions"
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activetab === "Contributions"
                      ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                      : "border-transparent text-dark-blue hover:text-saddle-brown"
                  }`}
                >
                  Contributions
                </Link>
              </span>
              <span>
                <Link
                  onClick={() => handleClick("LikedCampaigns")}
                  href="/UserProfile/likes"
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activetab === "LikedCampaigns"
                      ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                      : "border-transparent text-dark-blue hover:text-saddle-brown"
                  }`}
                >
                  LikedCampaigns
                </Link>
              </span>
            </div>
            <div className="mx-32 mt-2">
              <Divider className="bg-gray-600" />
            </div>
            <div className="flex justify-center mt-7 flex-col">
              <h2 className="text-2xl font-semibold  font-sans mb-2 flex justify-center">
                Contributed Campaigns Data
              </h2>
              {likedCampaigns && likedCampaigns.length > 0 ? (
                <div className="flex justify-center mx-20">
                  <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4">
                    <tbody>
                      <tr className="border-b">
                        <th className="text-left p-3 px-5">Campaign Name</th>
                        <th className="text-left p-3 px-5">Category</th>
                        <th></th>
                      </tr>
                      {likedCampaigns?.map((campaign: any, index: number) => (
                        <tr className="border-b hover:bg-orange-100 bg-gray-100">
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.title}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.category}
                            </p>
                          </td>
                          {/* <td className="p-3 px-5">
                              <p className="bg-transparent border-b-2 border-gray-300 py-2">
                                {campaign.donationAmount}
                              </p>
                            </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex justify-center my-10 font-medium  text-xl text-gray-500">
                  <p>You Have Not Liked Any Campaigns</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Like;
