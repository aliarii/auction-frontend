import { Checkbox, FormControlLabel, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionCard from "../components/Auction/AuctionCard";
import HorizontalLine from "../components/HorizontalLine";
import { getAuctionsByStatus } from "../store/slices/auctionSlice";
import { getAuctionCategories } from "../store/slices/categorySlice";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const AuctionsPage = () => {
  const location = useLocation();
  const { status } = location.state || "";
  const { auctions } = useSelector((state) => state.auction);
  const { auctionCategories } = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedStatus, setSelectedStatus] = useState([status || "All"]);
  const [showFilters, setShowFilters] = useState(false);
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

  const applyFilter = (filterCategories, filterStatus) => {
    setSelectedCategories(filterCategories);
    setSelectedStatus(filterStatus);
  };
  return (
    <div className="flex flex-col sm:flex-row self-center size-full max-w-6xl p-2 gap-2 overflow-auto">
      {/* Filters */}
      <button
        className="block sm:hidden w-full py-2 rounded-lg bg-green-400 text-white font-medium"
        onClick={() => setShowFilters(true)}
      >
        Filters
      </button>

      <div className="hidden sm:flex flex-col h-fit w-72 max-w-72 p-2 gap-2 bg-white shadow-md rounded-lg ">
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
      <div className="flex flex-col h-full w-full p-2 gap-2 bg-white shadow-md rounded-lg  overflow-auto">
        <h1 className="font-medium">Auctions</h1>
        <HorizontalLine />
        <Grid2
          container
          spacing={1}
          columns={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          className="size-full overflow-auto"
        >
          {filteredAuctions.map((auction, idx) => (
            <AuctionCard key={idx} auction={auction} />
          ))}
        </Grid2>
      </div>
      <FiltersModal
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
        categories={categories}
        applyFilter={applyFilter}
        currentSelectedCategories={selectedCategories}
        currentSelectedStatus={selectedStatus}
      />
    </div>
  );
};

export default AuctionsPage;

const FiltersModal = ({
  isVisible,
  onClose,
  categories,
  currentSelectedCategories,
  currentSelectedStatus,
  applyFilter,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    currentSelectedCategories
  );
  const [selectedStatus, setSelectedStatus] = useState(currentSelectedStatus);

  if (!isVisible) return null;

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

  const handleApply = () => {
    applyFilter(selectedCategories, selectedStatus);
    onClose();
  };

  const handleClose = () => {
    setSelectedCategories(currentSelectedCategories);
    setSelectedStatus(currentSelectedStatus);
    onClose();
  };
  return (
    <div className="flex justify-center items-center p-2 fixed inset-0 z-50 bg-white">
      <div className="flex flex-col size-full">
        <div className="relative flex flex-row justify-center items-center w-full p-1">
          <button onClick={handleClose} className="absolute top-0 left-0">
            <CloseIcon sx={{ fontSize: 30 }} />
          </button>
          <h1>Filters</h1>
        </div>
        <HorizontalLine />
        <div className="flex flex-col p-2">
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
        <div className="flex flex-col p-2">
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
      <div className="absolute bottom-0 p-2 w-full border">
        <button
          className="w-full py-2 rounded-lg bg-green-400 text-white font-medium"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
