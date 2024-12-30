// import React from "react";
// import HorizontalLine from "../components/HorizontalLine";
// import BidCard from "../components/BidCard";

// function AuctionPage() {
//   return (
//     <div className="size-full p-2 bg-red-200 ">
//       <div className="flex flex-row size-full gap-2 p-2 xl:px-40 bg-blue-200">
//         <div className="flex flex-col w-full bg-red-200">
//           <div className="size-96 bg-black"></div>
//           <HorizontalLine />
//           <h1>Product Details</h1>
//           <HorizontalLine />
//           <h1>Product Category</h1>
//           <h1>Product Name</h1>
//           <h1>Product Quantity</h1>
//           <h1>Product Condition</h1>
//           <h1>Product Desc</h1>
//         </div>
//         <div className="flex flex-col size-full bg-red-200">
//           <div className="flex flex-col">
//             <h1>Auction Details</h1>
//             <HorizontalLine />
//             <h1>Title:</h1>
//             <h1>Desc:</h1>
//             <h1>Category:</h1>
//             <h1>Starting Price:</h1>
//             <h1>Current Highest Bid:</h1>
//             <h1>Min Bid Interval:</h1>
//             <h1>Auction Start Date:</h1>
//             <h1>Auction End Date:</h1>
//             <h1>Remaining Time:</h1>
//           </div>
//           <HorizontalLine />
//           <h1>Bid Details</h1>
//           <HorizontalLine />
//           <div className="flex flex-col size-full bg-red-500">
//             <div>
//               <h1>asd</h1>
//             </div>
//             <HorizontalLine />
//             <div className="flex flex-col">
//               {Array.from(Array(20)).map((_, idx) => (
//                 <BidCard key={idx} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuctionPage;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HorizontalLine from "../components/HorizontalLine";
import BidCard from "../components/BidCard";
import { getAuctionById } from "../store/slices/auctionSlice";
import { calculateTimeLeft } from "../utils/timeUtils";

function AuctionPage() {
  const { auctionId } = useParams(); // Get auctionId from URL
  const dispatch = useDispatch();
  const { auction, isLoading, error } = useSelector((state) => state.auction);

  const [timeLeft, setTimeLeft] = useState(null);

  // Dispatch to fetch auction data
  useEffect(() => {
    if (auctionId) {
      dispatch(getAuctionById(auctionId));
    }
  }, [dispatch, auctionId]);

  // Memoize calculateTimeLeft function call
  const calcTimeLeftMemo = useCallback(() => {
    if (auction && auction.auctionEndTime) {
      const newTimeLeft = calculateTimeLeft(auction.auctionEndTime); // Use the imported function
      setTimeLeft(newTimeLeft);
    }
  }, [auction]);

  // Start countdown timer only if auction details are available
  useEffect(() => {
    if (auction && auction.auctionEndTime) {
      // Start interval only when auction data is valid
      const interval = setInterval(() => {
        calcTimeLeftMemo(); // Call memoized function
      }, 1000);

      // Cleanup function to clear the interval when auction data changes or the component unmounts
      return () => clearInterval(interval);
    }
    return undefined; // Ensure cleanup if there's no auction data
  }, [auction, calcTimeLeftMemo]); // Dependencies: auction and memoizedCalculateTimeLeft

  // Error handling and loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !auction) {
    return <div>Error loading auction details</div>;
  }

  return (
    <div className="size-full p-2 bg-red-200">
      <div className="flex flex-row size-full gap-2 p-2 xl:px-40 bg-blue-200">
        {/* Product Details Section */}
        <div className="flex flex-col w-full bg-red-200">
          <div className="size-96 bg-black"></div>
          <HorizontalLine />
          <h1>Product Details</h1>
          <HorizontalLine />
          <h1>Category: {auction.product.category?.name}</h1>
          <h1>Product Name: {auction.product.name}</h1>
          <h1>Product Quantity: {auction.product.quantity}</h1>
          <h1>Product Condition: {auction.condition}</h1>
          <h1>Product Desc: {auction.product.description}</h1>
        </div>

        {/* Auction Details Section */}
        <div className="flex flex-col size-full bg-red-200">
          <div className="flex flex-col">
            <h1>Auction Details</h1>
            <HorizontalLine />
            <h1>Title: {auction.title}</h1>
            <h1>Desc: {auction.description}</h1>
            <h1>Category: {auction.category.name}</h1>
            <h1>Starting Price: ${auction.startingPrice}</h1>
            <h1>Current Highest Bid: ${auction.currentHighestBid}</h1>
            <h1>Min Bid Interval: ${auction.minBidInterval}</h1>
            <h1>
              Auction Start Date:{" "}
              {new Date(auction.auctionStartTime).toLocaleString()}
            </h1>
            <h1>
              Auction End Date:{" "}
              {new Date(auction.auctionEndTime).toLocaleString()}
            </h1>
            <h1>Remaining Time: {timeLeft}</h1>
          </div>

          <HorizontalLine />
          <h1>Bid Details</h1>
          <HorizontalLine />
          <div className="flex flex-col size-full bg-red-500">
            <div>
              <h1>Previous Bids:</h1>
            </div>
            <HorizontalLine />
            <div className="flex flex-col">
              {auction.previousBids && auction.previousBids.length > 0 ? (
                auction.previousBids.map((bid, idx) => (
                  <BidCard key={idx} bid={bid} />
                ))
              ) : (
                <p>No bids yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
