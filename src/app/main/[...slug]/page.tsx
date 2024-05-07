"use client";

import React, { useEffect, useState } from "react";
import { UseSelector, useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Button from "@mui/material/Button";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toastFunction from "@/utils/toastUtils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CampaignData {
  _id: string;
  title: string;
  category: string;
  yourname: string;
  story: string;
  amountDonated: number;
  goal: number;
  image: string;
  contributedUsers: [];
  reviews: [];
}

interface Review {
  review: string;
}

const CampaignDetail: React.FC<{ params: { slug: string } }> = ({
  params,
}: {
  params: { slug: string };
}) => {
  //console.log(params, ">>>>>");
  const id = params.slug[0];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [review, setReview] = useState("");
  const [copy, setCopy] = useState(false);
  const [data, setData] = useState<CampaignData | null>(null);
  const [rdata, setRdata] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [donationAmout, setDonationAmount] = useState<Number | null>(null);

  const { userId }: { userId: string | null } = useSelector(
    (state: RootState) => state.auth
  );

  //  console.log(String(userId), ">>>>>>>>>>>>>");
  const copyToClipboard = () => {
    const campaignLink = window.location.href;
    navigator.clipboard.writeText(campaignLink).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    });
  };

  useEffect(() => {
    fetchData();
    fetchReview();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/campaign/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReview = async () => {
    try {
      const resp = await fetch(`http://localhost:3001/review/campaign/${id}`);
      const rdata = await resp.json();
      if (!resp.ok) {
        console.log("failed to load");
      } else {
        setRdata(rdata);
      }

      console.log(rdata, ">>>>");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShareOnWhatsApp = async () => {
    const message = `checkout this campaign : ${data?.title}\n${window.location.href}`;

    try {
      if (navigator.share) {
        await navigator.share;
        ({
          title: data?.title,
          text: message,
          url: window.location.href,
        });
      } else {
        const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // const calculateProgress = () => {
  //   if (!data) return 0;
  //   const percentage = (data.amountDonated / data.goal) * 100;
  //   return Math.min(percentage, 100);
  // };

  const redirectToCheckOut = async () => {
    try {
      if (donationAmout === null || donationAmout.valueOf() <= 0) {
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
          campaignImage: data?.image,
          campaignName: data?.title,
          userId: userId,
        }),
      });
      const sessionUrl = await res.text();
      window.location.href = sessionUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handlereview = (e: any) => {
    setReview(e.target.value);
  };

  const handlePostClick = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: review,
          user: userId,
          campaign: id,
        }),
      });

      const response = await res.json();
      if (!res.ok) {
        alert(response.message);
      }
      if (res.ok) {
        toastFunction("success", "Post Successfully");
        setReview("");
        await fetchReview();
      }
    } catch (error: any) {
      console.log("Error to post :::", error.message);
    }
  };

  return (
    <>
      {copy && (
        <div className="alert bg-green-300 mt-1">Link copied successfully!</div>
      )}
      {loading && (
        <>
          <div className="text-3xl items-center h-screen flex bg-slate-300 justify-center">
            Loading.....
          </div>
        </>
      )}
      {!loading && data && (
        <div className="responsive justify-center item-center  bg-slate-300 mt-2 p-4">
          <div className="responsive   mx-8  bg-white/40 m-2 rounded-lg">
            <div
              key={data._id}
              className="responsive card lg:card-side flex flex-row "
            >
              <img
                className="m-2 p-2 w-full lg:w-1/2 rounded-lg object-cover"
                width="650px"
                height="600px"
                src={data.image}
                alt="Campaign Image"
              />

              <div className="flex flex-col m-4 p-1/2  bg-white/50 h-full w-full lg:w-1/2 justify-items-center">
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
                    <form
                      className="w-full"
                      onSubmit={(e: any) => {
                        e.preventDefault();
                        redirectToCheckOut();
                      }}
                    >
                      <TextField
                        margin="normal"
                        name="donationAmount"
                        required
                        fullWidth
                        size="medium"
                        id="fullWidth"
                        variant="outlined"
                        value={donationAmout}
                        onChange={(e) =>
                          setDonationAmount(parseFloat(e.target.value))
                        }
                        type="number"
                        label="Enter Donation Amount"
                      />
                      <button
                        className="w-full bg-blue-600 hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        type="submit"
                      >
                        Donate Now
                      </button>
                    </form>
                  </div>
                  <div className=" justify-start">
                    <p className="jsutify-start font-semibold text-purple-900 mb-2">
                      {`${data.contributedUsers.length} people have just made a donation`}
                    </p>
                    <button onClick={copyToClipboard}>
                      <ContentCopyRoundedIcon />
                      <p>Copy to clipboard</p>
                    </button>
                    <button
                      onClick={handleShareOnWhatsApp}
                      className="mx-8 px-8"
                    >
                      <WhatsAppIcon />
                      <p>Share Whatsapp</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="pl-2 ml-2">{`${data.yourname} is organising this fundraiser.`}</p>
            <div className="md:flex md:flex-row  gap-10 m-2 p-2 ">
              <div className="flex flex-col p-2 m-2  md:w-1/2">
                <h2 className="flex flex-col font-black text-lg">
                  Campaign Story
                </h2>
                <p>{data.story}</p>
                <hr className="mt-4" />
                <h2 className="flex flex-col font-black text-lg mt-2">
                  Organiser
                </h2>
              </div>
              <div className="md:w-1/2 overflow-y-auto scrollbar-hidden  bg-white/30">
                <h2 className="font-black text-xl font-sans justify-center p-2 m-2">
                  Last Donations
                </h2>
                <div className="flex flex-col h-40  w-full">
                  {data.contributedUsers.length > 0 ? (
                    data.contributedUsers.map((item: any) => (
                      <>
                        <div className="flex flex-row items-center shadow-lg w-full mt-4 ">
                          <img
                            src="/images/fund.png"
                            style={{ width: "60px", height: "60px" }}
                            className="m-2 p-2"
                          />
                          <span>
                            <p className="text-2xl font-sans mr-6 ml-3 pr-2">
                              {item.userName}
                            </p>
                            <p className="text-lg font-sans mr-6 ml-3 pr-2 ">
                              ₹ {item.donationAmount}
                            </p>
                          </span>
                        </div>
                      </>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-lg text-gray-500">
                        No contributions yet. Be the first!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row pl-2 ml-2 w-full  mb-2">
              <img
                src="/images/profice.jpg"
                className="rounded-full w-20 h-20 object-cover mb-4 p-2 mt-2"
              />
              <div className="m-3">
                <p className="p-px font-semibold">{data.yourname}</p>
                <h5 className="p-px mb-2">Organiser</h5>
                <Button variant="outlined" className="" onClick={handleOpen}>
                  Contact
                </Button>
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ ...style, overflowY: "auto" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <p className="font-semibold">{`Write a message to ${data.yourname}`}</p>
                    <div className="flex flex-row mt-2">
                      <img
                        src="/images/profice.jpg"
                        className="rounded-full w-20 h-20 object-cover mb-4 p-2"
                      />
                      <div className="m-3">
                        <p className="p-px font-semibold">{data.yourname}</p>
                        <h5 className="p-px mb-2">Organiser</h5>
                      </div>
                    </div>
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    variant="inherit"
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <form
                      className="p-2 flex flex-col justify-center items-center w-1/2"
                      //  action="https://formcarry.com/s/Mc2CYx6LzHt"
                      //  method="POST"
                    >
                      <TextField
                        margin="normal"
                        name="name"
                        required
                        fullWidth
                        size="medium"
                        id="fullWidth"
                        variant="outlined"
                        label="Enter Your Name"
                      />
                      <TextField
                        margin="normal"
                        name="Email"
                        fullWidth
                        required
                        size="medium"
                        id="outlined-basic"
                        variant="outlined"
                        label="Enter Your Email"
                      />
                      <TextField
                        margin="normal"
                        name="message"
                        className="rounded-xl"
                        multiline
                        minRows={4}
                        fullWidth
                        required
                        size="medium"
                        id="outlined-basic"
                        variant="outlined"
                        label="Enter Your Message"
                      />
                      <Button
                        className="mt-6"
                        fullWidth
                        variant="outlined"
                        endIcon={<SendIcon />}
                        type="submit"
                        // onClick={sendMail}
                      >
                        Send
                      </Button>
                    </form>
                  </Typography>
                </Box>
              </Modal>
            </div>
            <div>
              <hr className="m-2 p-2" />
              <p className="text-center p-2 font-serif font-bold text-2xl">
                Words Of Support
              </p>
              <div className=" m-2 p-2 flex flex-col gap-1 items-center">
                <div className="mt-2 w-1/2">
                  <TextField
                    margin="normal"
                    name="review"
                    value={review}
                    onChange={handlereview}
                    required
                    fullWidth
                    size="medium"
                    id="fullWidth"
                    variant="outlined"
                    label="Write Your Words"
                  />
                </div>
                <div className="w-1/6 justify-center">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                    onClick={handlePostClick}
                  >
                    Post
                  </button>
                </div>
              </div>
              <div className="h-80 overflow-y-auto bg-white/30 rounded-lg">
                {rdata.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-lg text-gray-500">
                      No reviews yet. Be the first to post!
                    </p>
                  </div>
                ) : (
                  rdata.map((item: any) => (
                    <>
                      <div className="flex flex-row items-center shadow-lg w-full mt-4 ">
                        <img
                          src="/images/fund.png"
                          style={{ width: "60px", height: "60px" }}
                          className="m-2 p-2"
                        />
                        <span key={item._id}>
                          <p className="text-2xl font-sans mr-6 ml-3 pr-2">
                            {item.review}
                          </p>
                          <p className="text-lg font-sans mr-6 ml-3 pr-2 ">
                            {item.user.name}
                          </p>
                        </span>
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignDetail;
