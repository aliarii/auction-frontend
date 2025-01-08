import { Grid2 } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBidById } from "../../store/slices/bidSlice";
import { calculateTimeLeft } from "../../utils/timeUtils";
import { highestBid } from "../../utils/highestBid";
import ProductImages from "../Product/ProductImages";
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
      className="flex flex-col h-fit pb-2 gap-2 rounded-lg bg-light-3"
    >
      {/* Image Container */}

      <div className="relative h-fit w-full">
        <ProductImages product={auction?.product} />
        <h1
          className={`absolute flex justify-center items-center right-1 bottom-1 w-20 font-semibold rounded-full ${auction?.status === "Active" ? "bg-green-300 text-dark-7" : auction?.status === "Pending" ? "bg-info text-light-2" : "bg-danger text-light-2"}`}
        >
          {auction?.status === "Active"
            ? timeLeft
            : auction?.status === "Pending"
              ? "Bekleyen"
              : "Biten"}
        </h1>
      </div>

      {/* Auction Details */}
      <div className="flex flex-col h-fit px-2 py-1 gap-1 text-dark-7 font-semibold">
        <h2>{auction?.name}</h2>
        <div className="flex flex-row gap-1">
          <span>
            Son Teklif: {highestBid({ bid, auction, fontSize: "text-lg" })}
          </span>
        </div>
      </div>
      {onView ? (
        <div
          className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-light-2 font-semibold rounded-full bg-info cursor-pointer"
          onClick={onView}
        >
          <span>Görüntüle</span>
        </div>
      ) : (
        <Link
          to={`/auction/${auction?._id}`}
          className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-light-2 font-semibold rounded-full bg-info"
        >
          Görüntüle
        </Link>
      )}
    </Grid2>
  );
}

export default AuctionCard;
