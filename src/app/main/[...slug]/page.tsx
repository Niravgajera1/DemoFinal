"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
// import LinearProgress from "@mui/material/LinearProgress";

interface CampaignData {
  _id: string;
  title: string;
  category: string;
  yourname: string;
  story: string;
  amountDonated: number;
  goal: number;
  image: string;
}

const CampaignDetail: React.FC<{ params: { slug: string } }> = ({
  params,
}: {
  params: { slug: string };
}) => {
  const id = params.slug[0];
  console.log(id);
  console.log(`http://localhost:3001/campaign/${id}`);

  const [data, setData] = useState<CampaignData | null>(null);
  const [donationAmout, setDonationAmount] = useState<Number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const calculateProgress = () => {
  //   if (!data) return 0;
  //   const percentage = (data.amountDonated / data.goal) * 100;
  //   return Math.min(percentage, 100);
  // };
  const redirectToCheckOut = async () => {
    console.log(typeof donationAmout, donationAmout);
    try {
      if (donationAmout === null) {
        alert("Please Enter a donation Amount");
        return;
      }
      const res = await fetch(`http://localhost:3001/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId: id,
          donationAmount: donationAmout,
        }),
      });
      const sessionUrl = await res.text(); // Assuming the server sends the URL directly
      console.log(res);

      window.location.href = sessionUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {data && (
        <div className="responsive justify-center h-screen item-center bg-slate-300 mt-2 p-4">
          <div className="responsive justify-items-start bg-white/40 m-2 rounded-lg">
            <div
              key={data._id}
              className="responsive card lg:card-side flex flex-row "
            >
              <img
                className="m-2 p-2"
                width="650px"
                height="600px"
                src={data.image}
                alt="Shoes"
              />
              <div className="flex flex-col m-4 p-1/2  bg-white/50 h-scren w-screen justify-items-center">
                <div className="card-body flex flex-row">
                  <div className="card-title">
                    <h2 className="flex flex-row font-black text-lg">
                      Campaign Title
                    </h2>
                  </div>
                  <h4>{data.title}</h4>
                  <div className="card-title">
                    <h2 className="flex flex-row font-black text-lg">
                      Campaign Category
                    </h2>
                  </div>
                  <h4>{data.category}</h4>
                  <div className="card-title">
                    <h2 className="flex flex-row font-black text-lg">
                      Fund Raised By
                    </h2>
                  </div>
                  <h4>{data.yourname}</h4>
                  <div className="card-title">
                    <h2 className="flex flex-row font-black text-lg">
                      Fund Raised
                    </h2>
                  </div>
                  <h4>{data.amountDonated}</h4>
                  <div className="card-title">
                    <h2 className="flex flex-row font-black text-lg">
                      Goal Amount
                    </h2>
                  </div>
                  <h4>{data.goal}</h4>
                  <div className="card-actions justify-center mt-auto">
                    {/* <div>
                      Fund Raise{data.amountDonated} from {data.goal}
                      <LinearProgress
                        className="h-4"
                        variant="determinate"
                        value={calculateProgress()} // Call the function to get the progress value
                      />
                    </div> */}
                    <button
                      className="bg-blue-500 text-black text-xl p-2 w-full rounded-lg text-center hover:border hover:bg-blue-700 hover:border-stone-700 hover:text-white transform duration-300"
                      onClick={() => {
                        const amount = prompt("Enter Donation Amount:");
                        if (amount !== null && amount !== "") {
                          setDonationAmount(parseFloat(amount));
                          redirectToCheckOut();
                        }
                      }}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 m-2 w-1/2 m-2 p-2">
              <h2 className="flex flex-col font-black text-lg">
                Campaign Story
              </h2>
              <p>{data.story}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CampaignDetail;
