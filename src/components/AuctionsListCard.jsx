import React from "react";
import AuctionCard from "./AuctionCard";

function AuctionsListCard({ type, auctions }) {
  return (
    <div className="flex flex-col h-[340px] min-h-[340px] w-full p-2 gap-2 bg-dark-1 text-xl text-light-2 font-semibold rounded-lg overflow-auto">
      <div className="h-fit flex flex-row justify-between px-1">
        <h1>{type + " Auctions"}</h1>
        <h1>See All</h1>
      </div>

      <div className="flex flex-row items-center h-full w-full p-2 gap-2 bg-light-7 rounded-lg overflow-auto ">
        {auctions &&
          auctions.map((auction, idx) => (
            <AuctionCard key={idx} auction={auction} />
          ))}
      </div>
    </div>
  );
}

export default AuctionsListCard;
