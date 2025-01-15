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
    <div className="flex h-96 min-h-96 w-full flex-col gap-1 overflow-auto rounded-lg border bg-white p-2 shadow-sm sm:h-full sm:min-h-40">
      <h1>Previous Bids</h1>
      <HorizontalLine />
      <div className="flex size-full flex-col gap-1 overflow-auto">
        {bids && bids.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-sm">
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
