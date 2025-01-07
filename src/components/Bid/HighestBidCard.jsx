import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { highestBid } from "../../utils/highestBid";
import { getBidById } from "../../store/slices/bidSlice";

function HighestBidCard() {
  const { auction } = useSelector((state) => state.auction);
  const [bid, setBid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction) {
      if (auction.currentHighestBid) {
        dispatch(getBidById(auction.currentHighestBid._id)).then(
          ({ payload }) => {
            setBid(payload.data.bid);
          }
        );
      } else {
        setBid({ amount: auction.startingPrice, auction: auction._id });
      }
    }
  }, [auction, dispatch]);

  return (
    <div className="flex flex-col justify-center items-center w-full p-2 bg-dark-2 rounded-xl">
      <h1 className="font-semibold text-2xl text-light-2">En Yüksek Teklif</h1>
      <h1 className="font-semibold text-2xl text-light-2">
        {highestBid({ bid, auction })}
      </h1>
    </div>
  );
}

export default HighestBidCard;
