import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidById } from "../store/slices/bidSlice";
const socket = io("http://localhost:5000");

function AuctionHighestBid() {
  const { bid, isLoading, error } = useSelector((state) => state.bid);
  const { auction } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction && !bid) {
      dispatch(getBidById(auction.currentHighestBid));
    }
  }, [auction, bid, dispatch]);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      console.log("Yeni teklif alındı:", newBid);
      if (newBid.auctionId === auction._id) {
        dispatch(getBidById(newBid.bid._id));
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center w-full p-2 bg-dark-2 rounded-xl">
      <h1 className="font-bold text-3xl">En Yüksek Teklif</h1>
      <h1 className="font-bold text-3xl">{bid?.amount} TL</h1>
    </div>
  );
}

export default AuctionHighestBid;
