import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidById } from "../store/slices/bidSlice";
const socket = io("http://localhost:5000");

function HighestBidCard() {
  const { bid, isLoading, error } = useSelector((state) => state.bid);
  const { auction } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [prevBidAmount, setPrevBidAmount] = useState(0);
  useEffect(() => {
    if (auction && !bid && auction.currentHighestBid) {
      dispatch(getBidById(auction.currentHighestBid)).then((data) => {
        return setPrevBidAmount(data.payload.data.bid.amount);
      });
    }
  }, []);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      console.log("Yeni teklif alındı:", newBid);
      if (newBid.auctionId === auction._id) {
        dispatch(getBidById(newBid.bid._id)).then((data) => {
          // console.log("data", data);
          return setPrevBidAmount(data.payload.data.bid.amount);
        });
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center w-full p-2 bg-dark-2 rounded-xl">
      <h1 className="font-bold text-3xl">En Yüksek Teklif</h1>
      <h1 className="font-bold text-3xl">{bid?.amount || prevBidAmount} TL</h1>
    </div>
  );
}

export default HighestBidCard;
