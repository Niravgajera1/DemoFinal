"use client";
import { deleteCampaign } from "@/app/Redux/slice/userSlice";
import { RootState } from "@/app/Redux/store";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { createdCampaigns }: { createdCampaigns: object[] | null } =
    useSelector((state: RootState) => state.user);

  const [activetab, setActivetab] = useState<string>("Campaigns");

  const handleClick = (tabName: string) => {
    setActivetab(tabName);
  };
  const { name }: { name: string | null } = useSelector(
    (state: RootState) => state.user
  );

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
      <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4 h-screen">
        <div className="responsive   mx-8 my-8 mb-8 bg-white/40 px-4 py-4 rounded-lg ">
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
              Created Campaigns Data
            </h2>
            {createdCampaigns && createdCampaigns.length > 0 ? (
              <div className="flex justify-center mx-20">
                <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4 ">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">Category</th>
                      <th className="text-left p-3 px-5">CollectedAmount</th>
                      <th className="text-left p-3 px-5">GoalAmount</th>
                      <th></th>
                    </tr>
                    {createdCampaigns?.map((campaign: any, index: number) => (
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
                            {campaign.amountDonated}
                          </p>
                        </td>
                        <td className="p-3 px-5">
                          <p className="bg-transparent border-b-2 border-gray-300 py-2">
                            {campaign.goal}
                          </p>
                        </td>

                        <td className="p-3 px-5 flex justify-end">
                          <Link
                            href={`/main/${campaign._id}`}
                            className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            Show
                          </Link>
                          <Link
                            href={`campaigns/${campaign._id}`}
                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            Edit
                          </Link>
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
              <div className="flex justify-center my-10 text-gray-500 font-medium  text-xl">
                <p>You Have Not Created Any Campaigns</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
