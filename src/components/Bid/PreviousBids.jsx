import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getBidById, getBidsByAuction } from "../../store/slices/bidSlice";
import BidCard from "./BidCard";
import Loading from "../Loading";
import HorizontalLine from "../HorizontalLine";
const socket = io(import.meta.env.VITE_API_BASE_URL);

function PreviousBids() {
  const { auction } = useSelector((state) => state.auction);
  const { bids, isLoading } = useSelector((state) => state.bid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auction) {
      dispatch(getBidsByAuction(auction._id));
    }
  }, [auction, dispatch]);

  useEffect(() => {
    socket.on("updateBid", (newBid) => {
      if (newBid.auctionId === auction._id) {
        dispatch(getBidsByAuction(auction._id));
        dispatch(getBidById(newBid.bid._id));
        // console.log(newBid);
      }
    });

    return () => {
      socket.off("updateBid");
    };
  }, [auction, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-96 h-96 sm:min-h-40 sm:h-full  w-full p-2 gap-1 rounded-lg bg-white shadow-sm border overflow-auto">
      <h1>Previous Bids</h1>
      <HorizontalLine />
      <div className="flex flex-col size-full gap-1 overflow-auto">
        {bids && bids.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-sm">
              <thead className="font-semibold">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Bid</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {bids
                  .slice()
                  .reverse()
                  .map((bid) => (
                    <tr key={bid._id} className="border-t">
                      <td className="px-4 py-2">{bid._id.slice(0, 8)}</td>
                      <td className="px-4 py-2">{bid.amount} TL</td>
                      <td className="px-4 py-2">
                        {new Date(bid.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bids yet.</p>
        )}
      </div>
    </div>
  );
}

export default PreviousBids;
