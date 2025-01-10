import GavelIcon from "@mui/icons-material/Gavel";
import { Grid2 } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBidById } from "../../store/slices/bidSlice";
import { highestBid } from "../../utils/highestBid";
import { calculateTimeLeft } from "../../utils/timeUtils";
import ProductImages from "../Product/ProductImages";
import { RiAuctionFill } from "react-icons/ri";
function AuctionCard({ auction, onView }) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [bid, setBid] = useState(null);

  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime);
      setTimeLeft(newTimeLeft);
    }
  }, [auction]);

  useEffect(() => {
    if (auction && auction.auctionEndTime) {
      calcTimeLeftMemo();
      const interval = setInterval(() => {
        calcTimeLeftMemo();
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [auction, calcTimeLeftMemo]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auction) {
      if (auction.currentHighestBid) {
        dispatch(getBidById(auction.currentHighestBid._id)).then(
          ({ payload }) => {
            setBid(payload.data.bid);
          }
        );
      } else {
        setBid({ amount: auction.startingPrice, auction: auction._id });
      }
    }
  }, [auction, dispatch]);

  return (
    <Grid2
      size={{ xs: 2, sm: 3, md: 4, lg: 4 }}
      className="flex flex-col h-fit pb-2 bg-white rounded-lg border shadow-sm"
    >
      {/* Image Container */}

      <div className="relative h-fit w-full">
        <div className="m-2 border rounded-md">
          <ProductImages product={auction?.product} />
        </div>
        {/* <FaRegBookmark
          className="absolute right-4 top-4 text-green-500"
          style={{ fontSize: 30 }}
        /> */}
        {/* <FaBookmark /> */}
        <h1
          className={`absolute flex justify-center items-center right-4 bottom-4 w-24 py-1 rounded-full text-white font-medium ${auction?.status === "Active" ? "bg-green-200 !text-success" : auction?.status === "Pending" ? "bg-info" : "bg-danger"}`}
        >
          {auction?.status === "Active"
            ? timeLeft
            : auction?.status === "Pending"
              ? "Bekleyen"
              : "Biten"}
        </h1>
      </div>

      {/* Auction Details */}
      <div className="flex flex-col h-fit px-2 gap-1 mb-2">
        <span className="font-medium p-1">{auction?.name}</span>
        {/* <HorizontalLine /> */}
        <hr />

        <div className="flex flex-row items-center gap-4 py-1">
          {/* <GavelIcon sx={{ fontSize: 40 }} className="text-success" /> */}
          <RiAuctionFill style={{ fontSize: 45 }} className="text-green-500" />
          <div className="flex flex-col w-full">
            <span className="text-success">Current Bid</span>
            <span className="text-lg font-semibold">
              {highestBid({ bid, auction, fontSize: "text-lg" })}
            </span>
          </div>
        </div>
        <hr />
      </div>

      {onView ? (
        <div
          className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-light-2 font-semibold rounded-full bg-info cursor-pointer"
          onClick={onView}
        >
          <span>View</span>
        </div>
      ) : (
        <Link
          to={`/auction/${auction?._id}`}
          className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-white font-semibold rounded-full bg-green-500"
        >
          View
        </Link>
      )}
    </Grid2>
  );
}

export default AuctionCard;
