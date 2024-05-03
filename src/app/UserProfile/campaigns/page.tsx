"use client";
import { deleteCampaign } from "@/app/Redux/slice/userSlice";
import { RootState } from "@/app/Redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Campaigns = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { createdCampaigns }: { createdCampaigns: object[] | null } =
    useSelector((state: RootState) => state.user);

  const { name }: { name: string | null } = useSelector(
    (state: RootState) => state.user
  );

  const handleDeleteClick = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`, {
        method: "DELETE",
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
              <div className="flex justify-center my-10    font-medium  text-xl">
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
