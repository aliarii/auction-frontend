import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

function ProductDetails() {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex h-40 min-h-40 flex-col gap-1 overflow-auto rounded-lg border bg-white p-2 shadow-sm sm:h-full sm:min-h-40">
      <h1>Product Details</h1>
      <HorizontalLine />

      <div className="flex size-full flex-col gap-1 overflow-auto text-sm">
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(27%)] whitespace-nowrap font-medium">
            Product Name:
          </label>
          <span>{auction?.product.name}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(27%)] whitespace-nowrap font-medium">
            Product Quantity:
          </label>
          <span>{auction?.product.quantity}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(27%)] whitespace-nowrap font-medium">
            Product Condition:
          </label>
          <span>{auction?.condition}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="min-w-[calc(27%)] whitespace-nowrap font-medium">
            Product Description:
          </label>
          <span>{auction?.product.description}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
