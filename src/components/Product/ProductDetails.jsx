import React from "react";
import { useSelector } from "react-redux";
import HorizontalLine from "../HorizontalLine";

function ProductDetails() {
  const { auction } = useSelector((state) => state.auction);
  return (
    <div className="flex flex-col size-full p-2 gap-1 rounded-lg bg-dark-2 overflow-auto">
      <h1 className="text-lg text-light-2 font-semibold text-center">
        Ürün Detayları
      </h1>
      <HorizontalLine />

      <div className="flex flex-col size-full gap-1 overflow-auto">
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Ürün Adı:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.product.name}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Ürün Adedi:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.product.quantity}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Ürün Durumu:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.condition}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <label className="whitespace-nowrap min-w-[calc(38%)] text-sm text-light-5 ">
            Ürün Açıklaması:
          </label>
          <span className="text-sm text-light-5 font-medium">
            {auction?.product.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
