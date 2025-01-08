import { Grid2 } from "@mui/material";
import React from "react";
import ProductImages from "./ProductImages";

const ProductCard = ({ product, onClick }) => {
  return (
    <Grid2
      size={{ xs: 2, sm: 3, md: 4, lg: 4 }}
      className="flex flex-col h-fit pb-2 gap-2 rounded-lg bg-light-3"
    >
      {/* Image Container */}

      <div className=" h-fit w-full">
        <ProductImages product={product} />
      </div>

      {/* Auction Details */}
      <div className="flex flex-col h-fit px-2 py-1 gap-1 text-dark-7 font-semibold">
        <h2>{product.name}</h2>
      </div>
      <div
        className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-light-2 font-semibold rounded-full bg-info cursor-pointer"
        onClick={onClick}
      >
        <span>Görüntüle</span>
      </div>
    </Grid2>
  );
};

export default ProductCard;
