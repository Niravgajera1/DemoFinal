"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/slice/authSlice";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation";
import { FormControl } from "@mui/material";

const navbar = () => {
  const router = useRouter();
  const isAuthenticate = useSelector((state: any) => state.auth.isAuthenticate);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    dispatch(logout());
    window.location.href = "/";
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "For Charity") {
      router.push("/CreateCampaign");
    } else {
      router.push("/");
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      router.push(`/main/?category=${selectedCategory}`);
    } else {
      router.push("/main");
    }
  };

  return (
    <div className="grid min-h-[80px] w-full place-items-center rounded-lg p-6 ">
      <div className="-m-6  max-h-[768px] w-[calc(100%+48px)] bg-transperent ">
        <nav className="sticky top-0 z-10 block w-full max-w-full px-2 text-black bg-base-200 border rounded-none shadow-xl h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-4 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900 mx-2">
            <Link
              href="/"
              className="mr-4 block cursor-pointer py-1.5 font-sans font-medium text-2xl leading-relaxed text-inherit antialiased"
            >
              FundFusion
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden mr-4 lg:block">
                <Link
                  href="/"
                  className="mr-4 block cursor-pointer py-1.5 font-sans text-xl font-medium leading-relaxed text-inherit antialiased"
                >
                  Home
                </Link>
              </div>
              <ul>
                <li className="block p-1 font-sans text-lg  font-normal leading-normal text-blue-gray-900">
                  <Link href="/main" className="flex items-center">
                    Campaigns
                  </Link>
                </li>
              </ul>
              <select className="p-2" onChange={handleSelect}>
                <option disabled selected>
                  Category
                </option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Technology">Technology</option>
                <option value="Animals">Animals</option>
                <option value="Emergency">Emergency</option>
                <option value="Other">Other</option>
              </select>
              <div className="flex items-center gap-x-1">
                {!isAuthenticate && (
                  <Link href="/signup">
                    <button
                      className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </Link>
                )}
                {!isAuthenticate && (
                  <Link href="/signin">
                    <button
                      className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
                {/* {isAuthenticate && (
                <Link href="/CreateCampaign">
                  <button
                    className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                    onClick={}
                  >
                    CreateCampaign
                  </button>
                </Link>
              )} */}

                {isAuthenticate && (
                  <select className="p-2" onChange={handleChange}>
                    <option disabled selected>
                      Create Campaign
                    </option>
                    <option>For You</option>
                    <option>For Charity</option>
                  </select>
                )}
                {isAuthenticate && (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="/images/profice.jpg"
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link href="/UserProfile" className="justify-between">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/UserProfile/campaigns"
                          className="justify-between"
                        >
                          Campaigns
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/UserProfile/contributaions"
                          className="justify-between"
                        >
                          Contributions
                        </Link>
                      </li>
                      <li>
                        <Link href="/UpdatePassword">Update Password</Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default navbar;
