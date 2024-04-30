"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import Table from "../components/table";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Button, TextField } from "@mui/material";
import { error } from "console";

const Profile = () => {
  const { userId }: { userId: string | null } = useSelector(
    (state: any) => state.auth
  );
  // console.log(userId);

  const [userData, setUserData] = useState<any>(null);
  const [showtable, setShowtable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auth/${userId}`);
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

  const handleShowTable = () => {
    console.log("Btn Clicked ");
    alert("click");
    setShowtable(true);
  };

  return (
    <>
      <Navbar />
      {userData && (
        <div className="bg-slate-300 h-screen flex flex-col  items-center ">
          <div
            className="justify-items-start my-8 bg-white/80 rounded-lg  "
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
                <TextField
                  value={userData.name}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  // className="m-2"
                />
                <TextField
                  value={userData.email}
                  variant="outlined"
                  size="small"
                  // className="m-2"
                />
                <div className="flex flex-row mt-4">
                  {/* <Button
                    variant="outlined"
                    onClick={handleShowTable}
                    className="mr-4"
                  >
                    Your Campaigns
                  </Button> */}
                  <button
                    onClick={handleShowTable}
                    className="mx-9 px-4 py-2 rounded-lg shadow-xl  bg-gray-400 "
                  >
                    Your Campaigns
                  </button>
                  <div className="mx-9 bg-white px-4 py-2 rounded-lg shadow-xl ">
                    Contributed Campaigns
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border px-2 py-2 border-slate-400 flex flex-col w-1/2">
            <div className="flex flex-row gap-2 justify-start w-full">
              <div className="flex flex-row w-1/2 drop-shadow-2xl border-r-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <img src="/images/fund.png" width="40px" height="40px" />
                    <p className="px-2 text-3xl ">
                      {userData.contributedCampaigns.length}
                    </p>
                  </div>
                  <p className="pt-2 ">Fundraisers supported</p>
                </div>
              </div>
              <div className="flex flex-row w-1/2 drop-shadow-2xl rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <img src="/images/fund.png" width="40px" height="40px" />
                    <p className="px-2 text-3xl ">
                      {userData.createdCampaigns.length}
                    </p>
                  </div>
                  <p className="pt-2">Created Fundraisers</p>
                </div>
              </div>
            </div>
          </div>
          {showtable && <Table />}
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
