import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

const AuctionDetails = () => {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex flex-col size-full p-2 gap-1 rounded-lg bg-dark-2 overflow-auto">
      <h1 className="text-lg text-light-2 font-semibold text-center">
        Açık Arttırma Detayları
      </h1>
      <HorizontalLine />
      <h1 className="text-base text-light-2 font-medium text-center">
        {auction?.name}
      </h1>
      <HorizontalLine />

      <div className="flex flex-col size-full gap-1 overflow-auto">
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Kategori:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.category?.name}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Başlangıç Fiyatı:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.startingPrice} TL
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Minimum Artış:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.minimumBidInterval} TL
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Başlangıç Tarihi:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {new Date(auction?.auctionStartTime).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Bitiş Tarihi:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {new Date(auction?.auctionEndTime).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Ek Açıklamalar:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
