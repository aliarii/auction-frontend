import { Grid2 } from "@mui/material";
import React from "react";
import ProductImages from "./ProductImages";

const ProductCard = ({ product, onView }) => {
  return (
    <Grid2
      size={{ xs: 1, sm: 1, md: 1, lg: 1 }}
      className="flex h-fit flex-col rounded-lg border bg-white pb-2 shadow-md"
    >
      {/* Image Container */}

      <div className="h-40 w-full rounded-md">
        <ProductImages product={product} />
      </div>

      {/* Product Details */}
      <div className="my-2 flex h-fit flex-col gap-1 px-2">
        <span className="line-clamp-2 p-1 font-medium">{product?.name}</span>
        <hr />
      </div>
      <div
        className="h-8 w-[85%] max-w-56 cursor-pointer place-content-center self-center rounded-full bg-info text-center font-semibold text-light-2"
        onClick={onView}
      >
        <span>View</span>
      </div>
    </Grid2>
  );
};

export default ProductCard;
