"use client";
import { deleteCampaign } from "@/app/Redux/slice/userSlice";
import { Divider } from "@mui/material";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const campaigns = () => {
  const [activetab, setActivetab] = useState<string>("Campaigns");
  const [data, setData] = useState<[]>();
  const dispatch = useDispatch();

  const handleClick = (tabName: string) => {
    setActivetab(tabName);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/campaign/all");
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to Fetch");
    }
    if (response.ok) {
      setData(data);
    }
  };

  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const getTokenFromCookie = () => {
      const cookies = parseCookies();
      setToken(cookies["token"]);
    };

    getTokenFromCookie();
  }, []);

  const handleDeleteClick = async (id: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        alert("failed to delete");
      }
      if (response.ok) {
        dispatch(deleteCampaign(id));
        alert("deleted Successfully");
      }
    } catch (error) {
      console.log(error);
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
                Created Campaigns Data
              </h2>
              {data && data.length > 0 ? (
                <div className="flex justify-center mx-20">
                  <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4">
                    <tbody>
                      <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Category</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">CreatedBy</th>
                        <th className="text-left p-3 px-5">Goal Amound</th>
                        <th className="text-left p-3 px-5">Collected Amount</th>
                        <th className="text-left p-3 px-5">isActive</th>

                        <th></th>
                      </tr>
                      {data?.map((campaign: any, index: number) => (
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
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.useremail}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.yourname}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.goal}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.amountDonated}
                            </p>
                          </td>
                          <td className="p-3 px-5">
                            <p className="bg-transparent border-b-2 border-gray-300 py-2">
                              {campaign.isActive ? "Yes" : "No"}
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
                  <p>Any User Not Created Campaigns</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default campaigns;
