import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";
import AuctionCard from "../components/Auction/AuctionCard";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import HorizontalLine from "../components/HorizontalLine";

function HomePage() {
  const dispatch = useDispatch();
  const { auctions, isLoading, error } = useSelector((state) => state.auction);

  // Fetch auctions when component mounts
  useEffect(() => {
    dispatch(getAuctionsByStatus("Active,Pending,Closed"));
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading auctions</div>;
  // }

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
        ) : (
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
        )}
      </div>
      {/* </div> */}

      {/* Active Auctions */}
      {/* <AuctionsListCard type={"Active"} auctions={auctions?.activeAuctions} /> */}
      {/* Pending Auctions */}
      {/* <AuctionsListCard type={"Pending"} auctions={auctions?.pendingAuctions} /> */}
      {/* Closed Auctions */}
      {/* <AuctionsListCard type={"Closed"} auctions={auctions?.closedAuctions} /> */}
    </div>
  );
}

export default HomePage;
