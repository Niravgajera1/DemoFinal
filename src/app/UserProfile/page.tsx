"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setUser } from "../Redux/slice/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { userId }: { userId: string | null } = useSelector(
    (state: any) => state.auth
  );

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
      dispatch(setUser(data));
      setUserData(data);

      console.log(data, "usedata");
    } catch (error) {
      throw new Error("error : : :");
    }
  };

  return (
    <>
      {userData && (
        <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4 h-screen">
          <div className="responsive   mx-8 my-8 bg-white/40 px-4 py-4 rounded-lg">
            <div className="mx-32 pt-20 pb-10  px-2  font-semibold text-3xl font-sans ">
              {userData.name}
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
                    src="/images/fund.png"
                    style={{ height: "40px", width: "40px" }}
                  />
                  <p className="px-2 text-3xl">
                    {userData.createdCampaigns.length}
                  </p>
                  <p className="pt-2">Created Fundraisers</p>
                </div>
                <div className="flex flex-row mr-40">
                  <img
                    src="/images/fund.png"
                    style={{ height: "40px", width: "40px" }}
                  />
                  <p className="px-2 text-3xl">
                    {userData.contributedCampaigns.length}
                  </p>
                  <p className="pt-2">Contributed Fundraisers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
