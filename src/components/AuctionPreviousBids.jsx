import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidsByAuction } from "../store/slices/bidSlice";
import BidCard from "./BidCard";
const socket = io("http://localhost:5000");

function AuctionPreviousBids() {
  const { auction } = useSelector((state) => state.auction);
  const { bids, isLoading, error } = useSelector((state) => state.bid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction && !bids) {
      dispatch(getBidsByAuction(auction._id));
    }
  }, [auction, bids, dispatch]);

  useEffect(() => {
    socket.emit("joinAuction", auction._id);

    socket.on("updateBid", (newBid) => {
      console.log("Yeni teklif alındı:", newBid);
      if (newBid.auctionId === auction._id) {
        dispatch(getBidsByAuction(auction._id));
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col-reverse max-h-full w-full gap-1 overflow-auto ">
      {bids && bids.length > 0 ? (
        bids.map((bid, idx) => <BidCard key={idx} bid={bid} />)
      ) : (
        <p>No bids yet.</p>
      )}
    </div>
  );
}

export default AuctionPreviousBids;
