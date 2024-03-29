import React from "react";
import Link from "next/link";

const navbar = () => {
  return (
    <div className="grid min-h-[80px] w-full place-items-center rounded-lg p-6  ">
      <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] ">
        <nav className="sticky top-0 z-10 block w-full max-w-full px-2 text-black bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-4 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900 mx-2">
            <Link
              href="/"
              className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
            >
              Material Tailwind
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden mr-4 lg:block">
                <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Pages
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Account
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Blocks
                    </a>
                  </li>
                  <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    <a href="#" className="flex items-center">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-x-1">
                <Link href="/signup">
                  <button
                    className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link href="/signin">
                  <button
                    className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default navbar;
