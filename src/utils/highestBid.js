import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export function highestBid({ bid, auction, fontSize }) {
  const [bidAmount, setBidAmount] = useState(bid?.amount || 0);

  useEffect(() => {
    if (bid) setBidAmount(bid.amount);
  }, [bid]);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      console.log("Yeni teklif alındı:", newBid);
      if (newBid.auctionId === auction._id) {
        console.log(newBid);
        setBidAmount(newBid.bid.amount);
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction?._id]);

  return `${bidAmount || 0}` + " TL";
}
