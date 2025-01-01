import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateTimeLeft } from "../utils/timeUtils"; // External utility function

function AuctionCard({ auction }) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  // Memoized function to calculate time left
  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime);
      setTimeLeft(newTimeLeft);
    }
  }, [auction]);

  // Interval to update the remaining time
  useEffect(() => {
    if (auction && auction.auctionEndTime) {
      const interval = setInterval(() => {
        calcTimeLeftMemo(); // Use memoized time calculation function
      }, 1000); // 1 second for the countdown

      // Cleanup interval on component unmount or auction changes
      return () => clearInterval(interval);
    }
    return undefined;
  }, [auction, calcTimeLeftMemo]);

  return (
    <div className="flex flex-col h-full min-w-48 w-48 gap-2 p-2 rounded-lg bg-dark-3">
      {/* Auction Time Left */}
      <div className="h-28 rounded-md bg-red-300 relative">
        <h1 className="absolute flex justify-center items-center right-1 bottom-1 w-24 text-dark-7 rounded-full bg-green-300">
          {timeLeft}
        </h1>
        <div className="h-full w-full rounded-md bg-blue-200" />
      </div>

      {/* Auction Title */}
      <div className="flex items-center h-8 bg-blue-300">
        <h2>{auction.title}</h2>
      </div>

      {/* Current Bid */}
      <div className="flex items-center h-10 bg-red-300">
        <h3>Current Bid: ${auction.currentHighestBid?.amount}</h3>
      </div>

      {/* View Auction Link */}
      <div className="flex justify-center items-center h-8 rounded-md bg-red-300 cursor-pointer">
        <Link to={`/auction/${auction._id}`}>View Auction</Link>
      </div>
    </div>
  );
}

export default AuctionCard;
