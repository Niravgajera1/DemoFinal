"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

interface CardData {
  _id: string;
  title: string;
  category: string;
  story: string;
  enddate: string;
  image: string;
  amountDonated: number;
  goal: number;
}

const Card: React.FC = () => {
  const [data, setData] = useState<CardData[]>([]);
  const [totalpage, settotalPage] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const isAuthenticate = useSelector((state: any) => state.auth.isAuthenticate); // Ensure the selector returns the value of isAuthenticate
  const router = useRouter();

  const resPerPage: number = 6;

  const serchparams = useSearchParams();
  const category = serchparams.get("category");

  useEffect(() => {
    fetchData();
  }, [page, totalpage, category]);

  const fetchData = async () => {
    try {
      let apiurl = `http://localhost:3001/campaign?page=${page}`;
      if (category) {
        apiurl += `&category=${category}`;
      }

      const response = await fetch(apiurl);
      const { data, totalitem } = await response.json();
      const totalpage = Math.ceil(totalitem / resPerPage);

      if (!response.ok) {
        throw new Error(data.message);
      }
      setData(data);
      setLoading(false);
      settotalPage(totalpage);
      setPageNumbers(Array.from({ length: totalpage }, (_, i) => i + 1));
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMore = (id: string) => {
    if (isAuthenticate) {
      router.push(`/main/${id}`);
    } else {
      router.push("/signin");
    }
  };

  const calculateProgress = (amountDonated: number, goal: number) => {
    if (!data) return 0;
    const percentage = (amountDonated / goal) * 100;
    return Math.min(percentage, 100);
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePagebutton = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (loading) {
    return (
      <>
        <div className="text-3xl items-center h-screen flex justify-center">
          Loading...
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex flex-col  h-full m-2 p-2 card hover:scale-95 transition-transform duration-300 transform-none"
          >
            <div
              className="card card-normal w-full bg-base-100 shadow-lg shadow-neutral-700 hover:shadow-xl"
              onClick={() => handleShowMore(item._id)}
            >
              <figure>
                <img
                  src={item.image}
                  className="w-full"
                  alt="Image"
                  style={{
                    height: "250px",
                    width: "384px",
                    objectFit: "initial",
                  }}
                />
              </figure>
              <div
                className="card-bordered m-2 "
                style={{ border: "1px solid black", borderRadius: "8px" }}
              >
                <h2 className="card-title p-2 font-serif text-xl">
                  {item.category}
                </h2>
                <h3 className="p-1 pl-2 font-sans">
                  {item.title?.slice(0, 35)}
                </h3>
                <h2 className="p-1 pl-2 font-sans">
                  End Date : {item.enddate}
                </h2>
                <div className="p-3 mb-3">
                  ₹ {item.amountDonated} Raised of ₹{item.goal} Target
                  <LinearProgress
                    className="mt-1 h-px"
                    aria-setsize={4}
                    variant="determinate"
                    value={calculateProgress(item.amountDonated, item.goal)} // Call the function to get the progress value
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 px-4 mt-2 mb-2 p-2">
        {page === 1 ? (
          <div className="opacity-60" aria-disabled="true">
            {"<< Previous"}
          </div>
        ) : (
          <button
            onClick={handlePreviousClick}
            // className="bg-transperent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            {"<< Previous"}
          </button>
        )}
        <div className="flex space-x-2">
          {pageNumbers.map((pageNumber: number, index: number) => (
            <button
              key={index}
              className={
                page === pageNumber
                  ? "bg-blue-500 fw-bold px-2 rounded-lg text-black "
                  : "hover:bg-blue-500 px-2 rounded-md "
              }
              onClick={() => handlePagebutton(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        {page === totalpage ? (
          <div className="opacity-60" aria-disabled="true">
            {"Next >>"}
          </div>
        ) : (
          <button
            onClick={handleNextClick}
            // className="bg-transperent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            {"Next >>"}
          </button>
        )}
      </div>
    </>
  );
};
export default Card;
