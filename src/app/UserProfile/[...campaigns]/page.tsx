"use client";
import { RootState } from "@/app/Redux/store";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
const Camagns = () => {
  const pathame = usePathname();
  const contributors = pathame.split("/")[2];
  //console.log(contributors);
  const { createdCampaigns }: { createdCampaigns: object[] | null } =
    useSelector((state: RootState) => state.user);

  const { contributedCampaigns }: { contributedCampaigns: object[] | null } =
    useSelector((state: RootState) => state.user);

  const { name }: { name: string | null } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <Navbar />
      {contributors === "campaigns" ? (
        <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4 h-screen">
          <div className="responsive   mx-8 my-8 mb-8 bg-white/40 px-4 py-4 rounded-lg ">
            <div className="mx-32 pt-20 pb-10  px-2  font-semibold text-3xl font-sans ">
              {name}
            </div>
            <div className="mx-32 flex flex-row px-2">
              <span>
                <Link href="/UserProfile" className="font-sans text-xl mr-2">
                  Profile
                </Link>
              </span>
              <span>
                <Link
                  href="/UserProfile/campaigns"
                  className="font-sans text-xl ml-10 mr-2"
                >
                  Campaigns
                </Link>
              </span>
              <span>
                <Link
                  href="/UserProfile/contributaions"
                  className="font-sans text-xl ml-10 mr-2"
                >
                  Contributions
                </Link>
              </span>
            </div>
            <hr className="mx-32 mt-2" style={{ color: "gray" }}></hr>
            <div className="flex justify-center mt-7 flex-col">
              <h2 className="text-2xl font-semibold  font-sans mb-2 flex justify-center">
                Created Campaigns Data
              </h2>
              <div className="flex justify-center mx-20">
                <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4 ">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">id</th>
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">GoalAmount</th>
                      <th></th>
                    </tr>
                    {createdCampaigns?.map((campaign: any, index: number) => (
                      <tr className="border-b hover:bg-orange-100 bg-gray-100">
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            value={campaign.camapigId}
                            className="bg-transparent border-b-2 border-gray-300 py-2"
                          />
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            value={campaign.name}
                            className="bg-transparent border-b-2 border-gray-300 py-2"
                          />
                        </td>
                        <td className="p-3 px-5">
                          <input
                            type="text"
                            value={campaign.goalAmount}
                            className="bg-transparent border-b-2 border-gray-300 py-2"
                          />
                        </td>

                        <td className="p-3 px-5 flex justify-end">
                          <button
                            type="button"
                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* {createdCampaigns?.map(
             (campaign:any , index:number)=>(

             )
          )} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="responsive justify-center item-center  bg-slate-300 mt-2 mb-7 p-4">
          <div className="responsive relative h-auto  mx-8 my-8 bg-white/40 px-4 py-4 rounded-lg">
            <div className="mx-32 pt-20 pb-10  px-2  font-semibold text-3xl font-sans ">
              {name}
            </div>
            <div className="mx-32 flex flex-row px-2">
              <span>
                <Link href="/UserProfile" className="font-sans text-xl mr-2">
                  Profile
                </Link>
              </span>
              <span>
                <Link
                  href="/UserProfile/campaigns"
                  className="font-sans text-xl ml-10 mr-2"
                >
                  Campaigns
                </Link>
              </span>
              <span>
                <Link
                  href="/UserProfile/contributaions"
                  className="font-sans text-xl ml-10 mr-2"
                >
                  Contributions
                </Link>
              </span>
            </div>
            <hr className="mx-32 mt-2" style={{ color: "gray" }}></hr>
            <div className="flex justify-center mt-7 flex-col">
              <h2 className="text-2xl font-semibold  font-sans mb-2 flex justify-center">
                Created Campaigns Data
              </h2>
              <div className="flex justify-center mx-20">
                <table className="w-full text-md bg-white shadow-md rounded mb-4 mt-4">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">CampaignId</th>
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">DonatedAmount</th>
                      <th></th>
                    </tr>
                    {contributedCampaigns?.map(
                      (campaign: any, index: number) => (
                        <tr className="border-b hover:bg-orange-100 bg-gray-100">
                          <td className="p-3 px-5">
                            <input
                              type="text"
                              value={campaign.campaignId}
                              className="bg-transparent border-b-2 border-gray-300 py-2"
                            />
                          </td>
                          <td className="p-3 px-5">
                            <input
                              type="text"
                              value={campaign.name}
                              className="bg-transparent border-b-2 border-gray-300 py-2"
                            />
                          </td>
                          <td className="p-3 px-5">
                            <input
                              type="text"
                              value={campaign.donationAmount}
                              className="bg-transparent border-b-2 border-gray-300 py-2"
                            />
                          </td>

                          <td className="p-3 px-5 flex justify-end">
                            <button
                              type="button"
                              className="mr-3 text-sm bg-black-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Camagns;
