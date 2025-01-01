import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionsListCard from "../components/AuctionsListCard";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { auctions, isLoading, error } = useSelector((state) => state.auction);

  // Fetch auctions when component mounts
  useEffect(() => {
    dispatch(getAuctionsByStatus("Active,Pending,Closed"));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading auctions</div>;
  }

  return (
    <div className="flex flex-col size-full p-2 gap-2 overflow-auto">
      {/* Active Auctions */}
      <AuctionsListCard type={"Active"} auctions={auctions?.activeAuctions} />
      {/* Pending Auctions */}
      <AuctionsListCard type={"Pending"} auctions={auctions?.pendingAuctions} />
      {/* Closed Auctions */}
      <AuctionsListCard type={"Closed"} auctions={auctions?.closedAuctions} />
    </div>
  );
}

export default HomePage;
