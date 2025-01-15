import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

const AuctionDetails = () => {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-white p-2 shadow-sm">
      <h1>Auction Details</h1>
      <HorizontalLine />
      <h1 className="text-xl font-semibold">{auction?.name}</h1>

      <div className="flex size-full flex-col gap-1 overflow-auto text-sm">
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            Category:
          </label>
          <span>{auction?.category?.name || "-"}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            Starting Price:
          </label>
          <span>{auction?.startingPrice} TL</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            Price Interval:
          </label>
          <span>{auction?.minimumBidInterval} TL</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            Start Date:
          </label>
          <span>{new Date(auction?.auctionStartTime).toLocaleString()}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            End Date:
          </label>
          <span>{new Date(auction?.auctionEndTime).toLocaleString()}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(38%)] whitespace-nowrap font-medium">
            Description:
          </label>
          <span>{auction?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
