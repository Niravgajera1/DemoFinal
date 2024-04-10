"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CardData {
  _id: string;
  title: string;
  category: string;
  story: string;
  enddate: string;
  imageUrl: string;
}
const Card: React.FC = () => {
  const [data, setData] = useState<CardData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/campaign");
      if (!response.ok) {
        throw new Error("Failed to fatch data");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
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
              <img src={item.imageUrl} alt="Shoes" />
            </figure>
            <div className="card-normal">
              <h2 className="card-title p-4">{item.title}</h2>
              <p className="p-2">{item.story.slice(0, 65)}....</p>
              <h2 className="p-2">{item.enddate}</h2>
              <h3 className="p-2"> {item.category}</h3>
              <div className="card-actions justify-end mb-2 mr-2">
                <Link href={`/main/${item._id}`}>
                  <button className="btn btn-primary">Show more</button>
                </Link>
              </div>
              <div className="card-action justify-start"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Card;
