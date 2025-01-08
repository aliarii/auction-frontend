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
      <div className="flex flex-col size-full p-2 gap-2 bg-dark-1  rounded-lg overflow-auto">
        <div className="h-fit flex flex-row justify-between px-1 text-xl text-light-2 font-semibold">
          <h1>Aktif Açık Arttırmalar</h1>
          <Link to={"/auctions"} state={{ status: "Active" }}>
            Tümünü Gör
          </Link>
        </div>
        <HorizontalLine />
        {isLoading ? (
          <Loading />
        ) : auctions && auctions?.activeAuctions.length > 0 ? (
          <Grid2
            container
            spacing={1}
            columns={{ xs: 2, sm: 6, md: 12, lg: 16 }}
            className="size-full overflow-auto"
          >
            {auctions &&
              auctions?.activeAuctions?.map((auction, idx) => (
                <AuctionCard key={idx} auction={auction} />
              ))}
          </Grid2>
        ) : (
          <p className="text-center text-light-2">Aktif Kayıt Bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
