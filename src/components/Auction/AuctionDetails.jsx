import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

const AuctionDetails = () => {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex flex-col h-fit w-full p-2 gap-1 rounded-lg bg-white shadow-sm border">
      <h1>Auction Details</h1>
      <HorizontalLine />
      <h1 className="font-semibold text-xl">{auction?.name}</h1>

      <div className="flex flex-col size-full gap-1 overflow-auto text-sm">
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            Category:
          </label>
          <span>{auction?.category?.name || "-"}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            Starting Price:
          </label>
          <span>{auction?.startingPrice} TL</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            Price Interval:
          </label>
          <span>{auction?.minimumBidInterval} TL</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            Start Date:
          </label>
          <span>{new Date(auction?.auctionStartTime).toLocaleString()}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            End Date:
          </label>
          <span>{new Date(auction?.auctionEndTime).toLocaleString()}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] font-medium">
            Description:
          </label>
          <span>{auction?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
