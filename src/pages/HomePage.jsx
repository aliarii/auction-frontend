import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionCard from "../components/AuctionCard";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { auctions, isLoading, error } = useSelector((state) => state.auction);

  // Fetch auctions when component mounts
  useEffect(() => {
    dispatch(getAuctionsByStatus("Active,Pending,Closed"));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading auctions</div>;
  }

  return (
    <div className="flex flex-col size-full p-2 gap-2 bg-red-200 overflow-auto">
      {/* Active Auctions */}
      <div className="flex flex-col h-[340px] min-h-[340px] w-full p-2 gap-2 bg-blue-200 overflow-auto">
        <div className="flex flex-row justify-between">
          <h1>Active Auctions</h1>
          <h1>See All</h1>
        </div>

        <div className="flex flex-row items-center min-h-72 w-full gap-2 overflow-auto bg-red-300">
          {auctions &&
            auctions
              .filter((auction) => auction.status === "Active") // Active status'ındaki açık artırmalar
              .map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
        </div>
      </div>

      {/* Pending Auctions */}
      <div className="flex flex-col h-[340px] min-h-[340px] w-full p-2 gap-2 bg-blue-200 overflow-auto">
        <div className="flex flex-row justify-between">
          <h1>Pending Auctions</h1>
          <h1>See All</h1>
        </div>

        <div className="flex flex-row items-center min-h-72 w-full gap-2 overflow-auto bg-red-300">
          {auctions &&
            auctions
              .filter((auction) => auction.status === "Pending") // Pending status'ındaki açık artırmalar
              .map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
        </div>
      </div>
      {/* Closed Auctions */}
      <div className="flex flex-col h-[340px] min-h-[340px] w-full p-2 gap-2 bg-blue-200 overflow-auto">
        <div className="flex flex-row justify-between">
          <h1>Closed Auctions</h1>
          <h1>See All</h1>
        </div>

        <div className="flex flex-row items-center min-h-72 w-full gap-2 overflow-auto bg-red-300">
          {auctions &&
            auctions
              .filter((auction) => auction.status === "Closed") // Pending status'ındaki açık artırmalar
              .map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
