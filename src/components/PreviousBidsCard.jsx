import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidsByAuction } from "../store/slices/bidSlice";
import BidCard from "./BidCard";
const socket = io("http://localhost:5000");

function PreviousBidsCard() {
  const { auction } = useSelector((state) => state.auction);
  const { bids, isLoading, error } = useSelector((state) => state.bid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction && !bids && auction.previousBids.length > 0) {
      dispatch(getBidsByAuction(auction._id));
    }
  }, [auction, bids, dispatch]);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      if (newBid.auctionId === auction._id) {
        dispatch(getBidsByAuction(auction._id));
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col max-h-full w-full gap-1 overflow-auto ">
      {bids && bids.length > 0 ? (
        bids
          .slice()
          .reverse()
          .map((bid, idx) => <BidCard key={idx} bid={bid} />)
      ) : (
        <p>No bids yet.</p>
      )}
    </div>
  );
}

export default PreviousBidsCard;
