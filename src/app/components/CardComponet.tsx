"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const isAuthenticate = useSelector((state: any) => state.auth.isAuthenticate); // Ensure the selector returns the value of isAuthenticate
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/campaign");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMore = (id: string) => {
    //Pass the id parameter to handleShowMore function
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

  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          className="flex h-full m-2 p-2 card hover:scale-95 transition-transform duration-300 transform-none"
        >
          <div className="card w-96 bg-base-100 shadow-2xl">
            <figure>
              <img src={item.image} alt="Shoes" />
            </figure>
            <div className="card-normal">
              <h2 className="card-title p-4">{item.title}</h2>
              <p className="p-3">{item.story.slice(0, 50)}....</p>
              <h2 className="p-3">{item.enddate}</h2>
              <h3 className="p-3"> {item.category}</h3>
              <div className="p-3">
                Fund Raise {item.amountDonated} from {item.goal}
                <LinearProgress
                  aria-setsize={4}
                  variant="determinate"
                  value={calculateProgress(item.amountDonated, item.goal)} // Call the function to get the progress value
                />
              </div>
              <div className="card-actions justify-end mb-2 mr-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowMore(item._id)}
                >
                  Show more
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Card;
