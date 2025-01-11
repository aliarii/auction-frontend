import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

function ProductDetails() {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex flex-col size-full p-2 gap-1 rounded-lg bg-white shadow-sm border overflow-auto">
      <h1>Product Details</h1>
      <HorizontalLine />

      <div className="flex flex-col size-full gap-1 overflow-auto text-sm">
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(25%)] font-medium">
            Product Name:
          </label>
          <span>{auction?.product.name}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(25%)] font-medium">
            Product Quantity:
          </label>
          <span>{auction?.product.quantity}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(25%)] font-medium">
            Product Condition:
          </label>
          <span>{auction?.condition}</span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(25%)] font-medium">
            Product Description:
          </label>
          <span>{auction?.product.description}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
