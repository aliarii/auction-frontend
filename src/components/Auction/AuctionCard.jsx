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
          },
        );
      } else {
        setBid({ amount: auction.startingPrice, auction: auction._id });
      }
    }
  }, [auction, dispatch]);

  return (
    <Grid2
      size={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      className="flex h-fit flex-col rounded-lg border bg-white pb-2 shadow-md"
    >
      {/* Image Container */}

      <div className="relative h-40 w-full rounded-md">
        <ProductImages product={auction?.product} />

        <span
          className={`absolute bottom-2 right-2 flex w-24 items-center justify-center rounded-full py-1 font-medium text-white ${auction?.status === "Active" ? "bg-green-200 !text-success" : auction?.status === "Pending" ? "bg-info" : "bg-danger"}`}
        >
          {auction?.status === "Active"
            ? timeLeft
            : auction?.status === "Pending"
              ? "Bekleyen"
              : "Biten"}
        </span>
      </div>

      <div className="my-2 flex h-fit flex-col gap-1 px-2">
        <span className="line-clamp-2 p-1 font-medium">{auction?.name}</span>

        <hr />

        <div className="flex flex-row items-center gap-4 py-1">
          <RiAuctionFill style={{ fontSize: 45 }} className="text-green-500" />
          <div className="flex w-full flex-col">
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
          className="h-8 w-[85%] max-w-56 cursor-pointer place-content-center self-center rounded-full bg-info text-center font-semibold text-light-2"
          onClick={onView}
        >
          <span>View</span>
        </div>
      ) : (
        <Link
          to={`/auction-frontend/auction/${auction?._id}`}
          className="h-8 w-[85%] max-w-56 place-content-center self-center rounded-full bg-green-500 text-center font-semibold text-white"
        >
          View
        </Link>
      )}
    </Grid2>
  );
}

export default AuctionCard;
