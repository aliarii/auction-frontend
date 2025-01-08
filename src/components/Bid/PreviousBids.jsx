import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidById, getBidsByAuction } from "../../store/slices/bidSlice";
import BidCard from "./BidCard";
import Loading from "../Loading";
const socket = io(import.meta.env.VITE_API_BASE_URL);

function PreviousBids() {
  const { auction } = useSelector((state) => state.auction);
  const { bids, isLoading } = useSelector((state) => state.bid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction) {
      dispatch(getBidsByAuction(auction._id));
    }
  }, [auction, dispatch]);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      if (newBid.auctionId === auction._id) {
        dispatch(getBidsByAuction(auction._id));
        dispatch(getBidById(newBid.bid._id));
        // console.log(newBid);
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

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

export default PreviousBids;
