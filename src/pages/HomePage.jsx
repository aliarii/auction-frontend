import { Grid2 } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuctionCard from "../components/Auction/AuctionCard";
import HorizontalLine from "../components/HorizontalLine";
import Loading from "../components/Loading";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { auctions, isLoading, error } = useSelector((state) => state.auction);

  // Fetch auctions when component mounts
  useEffect(() => {
    dispatch(getAuctionsByStatus("Active,Pending,Closed"));
  }, []);

  return (
    <div className="flex flex-col self-center size-full max-w-6xl p-2 gap-2 overflow-auto">
      <div className="flex flex-col size-full p-2 gap-2 bg-white shadow-md rounded-lg overflow-auto">
        <div className="flex flex-row justify-between h-fit  px-1 font-medium">
          <h1>Live Auctions</h1>
          <Link to={"/auctions"} state={{ status: "Active" }}>
            See All
          </Link>
        </div>
        <HorizontalLine />
        {isLoading ? (
          <Loading />
        ) : auctions && auctions?.activeAuctions?.length > 0 ? (
          <Grid2
            container
            spacing={1}
            columns={{ xs: 2, sm: 3, md: 4, lg: 4 }}
            className="size-full overflow-auto"
          >
            {auctions &&
              auctions?.activeAuctions?.map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
          </Grid2>
        ) : (
          <p className="text-center">Aktif Kayıt Bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
