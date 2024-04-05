"use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "@/app/components/navbar";
// import Footer from "@/app/components/footer";

// interface CampaignData {
//   _id: string;
//   title: string;
//   category: string;
//   yourname: string;
// }

// const CampaignDetail: React.FC<{ params: { slug: string } }> = ({
//   params,
// }: {
//   params: { slug: string };
// }) => {
//   const id = params.slug[0];
//   console.log(id);
//   console.log(`http://localhost:3001/campaign/${id}`);

//   const [data, setData] = useState<CampaignData[]>([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/campaign/${id}`);
//       if (!response.ok) {
//         throw new Error("failed to fetch");
//       }
//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       {data.map((item) => {
//         <div className="justify-center item-center bg-slate-300 mt-2 p-4">
//           <Navbar />
//           <div
//             key={item._id}
//             className="card lg:card-side flex flex-row justify-items-start bg-white/40 m-2"
//           >
//             <img
//               className="m-2 p-2"
//               width="650px"
//               height="600px"
//               src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
//               alt="Shoes"
//             />
//             <div className="flex flex-col m-4 p-1/2  bg-white/50 h-scren w-screen justify-items-center">
//               <div className="card-body flex flex row ">
//                 <div className="card-title">
//                   <h2 className=" flex flex-row font-black text-lg">
//                     Campaign Title
//                   </h2>
//                 </div>
//                 <h4 className="">{item.title}</h4>
//                 <div className="card-title">
//                   <h2 className=" flex flex-row font-black text-lg">
//                     Campaign Category
//                   </h2>
//                 </div>
//                 <h4>{item.category}</h4>
//                 <div className="card-title">
//                   <h2 className=" flex flex-row font-black text-lg">
//                     Fund Raised By
//                   </h2>
//                 </div>
//                 <h4 className="">{item.yourname}</h4>
//                 <div className="card-actions justify-center mt-auto">
//                   <button className="bg-blue-500 text-white text-xl p-2 w-full rounded-lg text-center hover:border hover:bg-blue-700 hover:border-stone-700 hover:text-black transfrom duration-300">
//                     Donate Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer />
//         </div>;
//       })}
//     </>
//   );
// };

// export default CampaignDetail;

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

interface CampaignData {
  _id: string;
  title: string;
  category: string;
  yourname: string;
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

  const HandleClick = () => {
    alert("Butto Clicked");
  };

  return (
    <>
      <Navbar />
      <div className="justify-center h-screen item-center bg-slate-300 mt-2 p-4">
        <div className="justify-items-start bg-white/40 m-2 rounded-lg">
          {data && (
            <div key={data._id} className="card lg:card-side flex flex-row ">
              <img
                className="m-2 p-2"
                width="650px"
                height="600px"
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
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
                  <div className="card-actions justify-center mt-auto">
                    <button
                      className="bg-blue-500 text-black text-xl p-2 w-full rounded-lg text-center hover:border hover:bg-blue-700 hover:border-stone-700 hover:text-white transform duration-300"
                      onClick={HandleClick}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row p-2 m-2">
            <h2>Paymenrts</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetail;
