import React from "react";

function BidCard({ bid }) {
  return (
    <div className="flex flex-row gap-2 rounded-md bg-light-4 p-2">
      <div className="flex flex-col">
        {/* <h1>Bidder: {bid.bidderName}</h1> */}
        <h2>Teklif Miktarı: {bid?.amount} TL</h2>
        <h3>Tarih: {new Date(bid?.createdAt).toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default BidCard;
