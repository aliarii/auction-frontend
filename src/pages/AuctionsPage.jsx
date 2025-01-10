import { Checkbox, FormControlLabel, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionCard from "../components/Auction/AuctionCard";
import HorizontalLine from "../components/HorizontalLine";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";
import { getAuctionCategories } from "../store/slices/categorySlice";
import { useLocation } from "react-router-dom";

const AuctionsPage = () => {
  const location = useLocation();
  const { status } = location.state || "";
  const { auctions } = useSelector((state) => state.auction);
  const { auctionCategories } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedStatus, setSelectedStatus] = useState([status || "All"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuctionsByStatus("Active,Pending,Closed"));
    dispatch(getAuctionCategories());
  }, []);

  useEffect(() => {
    if (auctionCategories && auctions && auctions.activeAuctions) {
      const allAuctions = [
        ...auctions.activeAuctions,
        ...auctions.pendingAuctions,
        ...auctions.closedAuctions,
      ];
      const newCategories = [
        { name: "All", auctions: allAuctions },
        ...auctionCategories,
      ];
      setCategories(newCategories);
      setFilteredAuctions(allAuctions); // Başlangıçta tüm açık arttırmaları göster
    }
  }, [auctions, auctionCategories]);

  useEffect(() => {
    if (!auctionCategories || !auctions || !auctions.activeAuctions) return;
    // Kategori veya durum değiştiğinde filtreleme işlemi yap
    let filtered = [
      ...auctions.activeAuctions,
      ...auctions.pendingAuctions,
      ...auctions.closedAuctions,
    ];

    // Kategorilere göre filtreleme
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter((auction) => {
        selectedCategories.includes(auction.category?.name);
      });
    }

    // Duruma göre filtreleme
    if (selectedStatus.length > 0 && !selectedStatus.includes("All")) {
      filtered = filtered.filter((auction) =>
        selectedStatus.includes(auction.status)
      );
    }

    setFilteredAuctions(filtered);
  }, [selectedCategories, selectedStatus, auctions, auctionCategories]);

  // Kategori seçim işlemi
  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;

    if (selectedCategories.length <= 1 && !checked) {
      setSelectedCategories(["All"]);
    } else {
      if (name === "All") {
        // "All" seçilirse, diğer tüm seçenekleri kaldır
        setSelectedCategories(checked ? ["All"] : []);
      } else {
        setSelectedCategories(
          (prevSelectedCategories) =>
            checked
              ? [...prevSelectedCategories.filter((cat) => cat !== "All"), name] // "All" yı kaldır ve yeni kategoriyi ekle
              : prevSelectedCategories.filter((category) => category !== name) // Seçili kategoriyi kaldır
        );
      }
    }
  };

  // Durum seçim işlemi
  const handleStatusChange = (event) => {
    const { name, checked } = event.target;
    if (selectedStatus.length <= 1 && !checked) {
      setSelectedStatus(["All"]);
    } else {
      if (name === "All") {
        // "All" seçilirse, diğer tüm seçenekleri kaldır
        setSelectedStatus(checked ? ["All"] : []);
      } else {
        setSelectedStatus(
          (prevSelectedStatus) =>
            checked
              ? [
                  ...prevSelectedStatus.filter((status) => status !== "All"),
                  name,
                ]
              : prevSelectedStatus.filter((status) => status !== name) // Seçili durumu kaldır
        );
      }
    }
  };

  return (
    <div className="flex flex-row self-center size-full max-w-6xl p-2 gap-2 overflow-auto">
      {/* Filters */}
      <div className="flex flex-col h-fit w-72 max-w-72 p-2 gap-2 rounded-lg ">
        <h1 className="font-medium">Filters</h1>
        <HorizontalLine />

        {/* Categories */}
        <div className="flex flex-col h-60 max-h-60 p-2 bg-white shadow-sm border rounded-lg overflow-auto">
          <h1>Categories</h1>
          <hr className="border-green-300" />
          {categories &&
            categories.map((category, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onChange={handleCategoryChange}
                    name={category.name}
                    size="small"
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {category.name}
                  </Typography>
                }
                className="-mb-3"
              />
            ))}
        </div>
        <HorizontalLine />

        {/* Status */}
        <div className="flex flex-col h-60 max-h-60 p-2 bg-white shadow-sm border rounded-lg overflow-auto">
          <h1>Status</h1>
          <hr className="border-green-300" />
          {["All", "Active", "Pending", "Closed"].map((status, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={selectedStatus.includes(status)}
                  onChange={handleStatusChange}
                  name={status}
                  size="small"
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 15,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {status}
                </Typography>
              }
              className="-mb-3"
            />
          ))}
        </div>
      </div>

      {/* Auctions */}
      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="font-medium">Auctions</h1>
        </div>
        <HorizontalLine />
        <Grid2
          container
          spacing={1}
          columns={{ xs: 2, sm: 6, md: 12, lg: 16 }}
          className="size-full overflow-auto"
        >
          {filteredAuctions.map((auction, idx) => (
            <AuctionCard key={idx} auction={auction} />
          ))}
        </Grid2>
      </div>
    </div>
  );
};

export default AuctionsPage;
