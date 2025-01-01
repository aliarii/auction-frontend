import React from "react";

function BidCard({ bid }) {
  return (
    <div className="flex flex-row p-2 gap-2 bg-blue-200 rounded-md">
      <div className="flex flex-col">
        {/* <h1>Bidder: {bid.bidderName}</h1> */}
        <h2>Bid Amount: ${bid?.amount}</h2>
        <h3>Time: {new Date(bid?.createdAt).toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default BidCard;
