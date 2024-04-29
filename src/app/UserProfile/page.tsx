"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { TextField } from "@mui/material";
import { error } from "console";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/auth/661cd8c2024f1a906d3990c4"
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("failed to fetch", data.message);
      }
      setUserData(data);
      //console.log(data, ">>>>>>>>>>>>>>>>>>>>>>>");
    } catch (error) {
      throw new Error("error : : :");
    }
  };

  return (
    <>
      <Navbar />
      {userData && (
        <div className="bg-slate-300 h-screen flex flex-col justify-center items-center ">
          <div
            className="justify-items-start my-8 bg-white/80 rounded-lg shadow-neutral-600 shadow-2xl"
            style={{ width: "40%" }}
          >
            <div className="flex flex-row">
              <figure>
                <img
                  className="w-40 rounded-full p-4 m-2 my-2"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </figure>
              <div className="flex flex-col m-3  p-2">
                <h1 className="font-semibold text-xl">Name </h1>
                <TextField
                  value={userData.name}
                  variant="filled"
                  size="small"
                  // className="m-2"
                />
                <h1 className="font-semibold text-xl mt-4">Email</h1>
                <TextField
                  value={userData.email}
                  variant="filled"
                  size="small"
                  // className="m-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;

// <div className="mx-12 mt-4 mb-6">
// <h2 className="text-xl font-semibold mb-2">
//   Contributed Campaigns Data
// </h2>
// <table className="table-auto">
//   <thead>
//     <tr>
//       <th className="px-4 py-2">Campaign ID</th>
//       <th className="px-4 py-2">Campaign Name</th>
//       <th className="px-4 py-2">Amount Donated</th>
//     </tr>
//   </thead>
//   <tbody>
//     {userData.contributedCampaigns.map(
//       (campaign: any, index: number) => (
//         <tr key={index}>
//           <td className="border px-4 py-2">
//             {campaign.campaignId}
//           </td>
//           <td className="border px-4 py-2">{campaign.name}</td>
//           <td className="border px-4 py-2">
//             {campaign.donationAmount}
//           </td>
//         </tr>
//       )
//     )}
//   </tbody>
// </table>
// </div>
