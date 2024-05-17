"use client";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const users = () => {
  const [activetab, setActivetab] = useState<string>("Users");
  const [data, setData] = useState<[]>();

  const handleClick = (tabName: string) => {
    setActivetab(tabName);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth");
      const resdata = await res.json();
      if (!res.ok) {
        alert("Data failed to fetch");
      }
      if (res.ok) {
        setData(resdata);
        console.log(">>resdta", resdata);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div>
      <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4">
        <div className="responsive relative h-auto  mx-8 my-8 bg-white/40 px-4 py-4 rounded-lg">

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
            <div className="mx-32 mt-2">
              <Divider className="bg-gray-600" />
            </div>
            <div className="flex justify-center mt-7 flex-col">
              <h2 className="text-2xl font-semibold  font-sans mb-2 flex justify-center">
                Registed Users Data
              </h2>
              {data && data.length > 0 ? (
                <div className="flex justify-center mx-20">
                  <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4">
                    <tbody>
                      <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">CreatedCampaigns</th>
                        <th className="text-left p-3 px-5">LikedCampaigns</th>
                        <th className="text-left p-3 px-5">
                          ContributedCampaigns
                        </th>
                        <th className="text-left p-3 px-5">AmountDonated</th>

                        <th></th>
                      </tr>
                      {data?.map((users: any, index: number) => (
                        <tr className="border-b hover:bg-orange-100 bg-gray-100">
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.name}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.email}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.createdCampaigns.length}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.contributedCampaigns.length}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.likedCampaigns.length}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {users.totalDonatedAmount}
                            </p>
                          </td>
                          <td className="p-3 px-5 flex justify-end">
                          <button
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDeleteClick(campaign._id)}
                          >
                            Delete
                          </button>
                          </td>
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
      </div>
    </>
  );
};

export default users;
