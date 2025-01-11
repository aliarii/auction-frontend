import { Grid2 } from "@mui/material";
import React from "react";
import ProductImages from "./ProductImages";

const ProductCard = ({ product, onView }) => {
  return (
    <Grid2
      size={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      className="flex flex-col h-fit pb-2 bg-white rounded-lg border shadow-md"
    >
      {/* Image Container */}

      <div className="h-40 w-full rounded-md">
        <ProductImages product={product} />
      </div>

      {/* Product Details */}
      <div className="flex flex-col h-fit px-2 gap-1 my-2 ">
        <span className="p-1 line-clamp-2 font-medium">{product?.name}</span>
        <hr />
      </div>
      <div
        className="h-8 w-[85%] max-w-56 self-center text-center place-content-center text-light-2 font-semibold rounded-full bg-info cursor-pointer"
        onClick={onView}
      >
        <span>View</span>
      </div>
    </Grid2>
  );
};

export default ProductCard;
