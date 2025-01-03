import { Grid2, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionCard from "../components/AuctionCard";
import HorizontalLine from "../components/HorizontalLine";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";
import { getAuctionCategories } from "../store/slices/categorySlice";

const AuctionsPage = () => {
  const { auctions } = useSelector((state) => state.auction);
  const { auctionCategories } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["Tümü"]); // Başlangıçta Tümü seçili
  const [selectedStatus, setSelectedStatus] = useState(["Tümü"]); // Başlangıçta Tümü seçili
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
        { name: "Tümü", auctions: allAuctions },
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
    if (selectedCategories.length > 0 && !selectedCategories.includes("Tümü")) {
      filtered = filtered.filter((auction) =>
        selectedCategories.includes(auction.category.name)
      );
    }

    // Duruma göre filtreleme
    if (selectedStatus.length > 0 && !selectedStatus.includes("Tümü")) {
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
      setSelectedCategories(["Tümü"]);
    } else {
      if (name === "Tümü") {
        // "Tümü" seçilirse, diğer tüm seçenekleri kaldır
        setSelectedCategories(checked ? ["Tümü"] : []);
      } else {
        setSelectedCategories(
          (prevSelectedCategories) =>
            checked
              ? [
                  ...prevSelectedCategories.filter((cat) => cat !== "Tümü"),
                  name,
                ] // "Tümü" yı kaldır ve yeni kategoriyi ekle
              : prevSelectedCategories.filter((category) => category !== name) // Seçili kategoriyi kaldır
        );
      }
    }
  };

  // Durum seçim işlemi
  const handleStatusChange = (event) => {
    const { name, checked } = event.target;
    if (selectedStatus.length <= 1 && !checked) {
      setSelectedStatus(["Tümü"]);
    } else {
      if (name === "Tümü") {
        // "Tümü" seçilirse, diğer tüm seçenekleri kaldır
        setSelectedStatus(checked ? ["Tümü"] : []);
      } else {
        setSelectedStatus(
          (prevSelectedStatus) =>
            checked
              ? [
                  ...prevSelectedStatus.filter((status) => status !== "Tümü"),
                  name,
                ] // "Tümü" yı kaldır ve yeni durumu ekle
              : prevSelectedStatus.filter((status) => status !== name) // Seçili durumu kaldır
        );
      }
    }
  };

  return (
    <div className="flex flex-row size-full p-2 gap-2 overflow-auto">
      {/* Filtreleme Paneli */}
      <div className="flex flex-col h-fit w-72 max-w-72 p-2 gap-2 rounded-lg bg-dark-1">
        <h1 className="text-lg text-light-2 font-semibold">Filtreleme</h1>
        <HorizontalLine />

        {/* Kategoriler */}
        <h1 className="text-base text-light-2 font-semibold">Kategoriler</h1>
        <div className="flex flex-col h-60 max-h-60 px-2 bg-light-6 rounded-md overflow-auto">
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
                      fontWeight: 600,
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

        {/* Durum */}
        <h1 className="text-md text-light-2 font-semibold">Durum</h1>
        <div className="flex flex-col h-60 max-h-60 px-2 bg-light-6 rounded-md overflow-auto">
          {["Tümü", "Active", "Pending", "Closed"].map((status, idx) => (
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
                    fontWeight: 600,
                  }}
                >
                  {status === "Tümü"
                    ? "Tümü"
                    : status === "Active"
                      ? "Aktif"
                      : status === "Pending"
                        ? "Bekleyen"
                        : "Biten"}
                </Typography>
              }
              className="-mb-3"
            />
          ))}
        </div>
      </div>

      {/* Açık Arttırmalar */}
      <div className="flex flex-col h-full w-full p-2 gap-2 rounded-lg bg-dark-1 overflow-auto">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-lg text-light-2 font-semibold">
            Açık Arttırmalar
          </h1>
        </div>
        <HorizontalLine />
        <div className="h-full w-full p-2 bg-light-6 rounded-md overflow-auto">
          <Grid2
            container
            spacing={1}
            columns={{ xs: 2, sm: 6, md: 12, lg: 20, xl: 30 }}
          >
            {filteredAuctions.map((auction, idx) => (
              <AuctionCard key={idx} auction={auction} />
            ))}
          </Grid2>
        </div>
      </div>
    </div>
  );
};

export default AuctionsPage;
