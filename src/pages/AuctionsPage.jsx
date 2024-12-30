import React, { useEffect } from "react";
import HorizontalLine from "../components/HorizontalLine";
import AuctionCard from "../components/AuctionCard";
import { useDispatch, useSelector } from "react-redux";
import { getAuctions } from "../store/slices/auctionSlice";

function AuctionsPage() {
  const { auctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auctions) {
      dispatch(getAuctions());
    }
  }, [auctions, dispatch]);

  return (
    <div className="flex flex-row size-full p-2 gap-2 bg-red-200 overflow-auto">
      {/* filter bar */}
      <div className="flex flex-col h-full w-52 p-2 gap-2 bg-blue-100">
        <h1>Filters</h1>

        <HorizontalLine />

        <div className="bg-red-200">
          <h1>Categories</h1>
          <div className="p-2 rounded-md bg-slate-500 ">
            {Array.from(Array(5)).map((_, idx) => (
              <h1 key={idx}>{idx}</h1>
            ))}
          </div>
        </div>

        <HorizontalLine />

        <div className="bg-red-200">
          <h1>Status</h1>
          <div className="p-2 rounded-md bg-slate-500 ">
            {Array.from(Array(5)).map((_, idx) => (
              <h1 key={idx}>{idx}</h1>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col size-full p-2 gap-2 bg-blue-100">
        <div className="flex flex-row justify-between items-center">
          <h1>Auctions</h1>
          <h1>Sort</h1>
        </div>

        <HorizontalLine />

        <div className="flex flex-wrap justify-start gap-2 overflow-auto bg-red-300">
          {Array.from(Array(20)).map((_, idx) => (
            <AuctionCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuctionsPage;
