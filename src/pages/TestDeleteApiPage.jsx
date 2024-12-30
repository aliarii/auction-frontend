import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../store/slices/productSlice";
import { deleteAuction } from "../store/slices/auctionSlice";
import {
  deleteAuctionCategory,
  deleteProductCategory,
} from "../store/slices/categorySlice";

function TestDeleteApiPage() {
  const { product } = useSelector((state) => state.product); // Get current product data from store
  const { auction } = useSelector((state) => state.auction); // Get current auction data from store
  const { productCategory } = useSelector((state) => state.category); // Get current product category data
  const { auctionCategory } = useSelector((state) => state.category); // Get current auction category data
  const dispatch = useDispatch();

  // Local state for DELETE request payloads for each category
  const [productData, setProductData] = useState({
    id: product?.id || "",
  });

  const [auctionData, setAuctionData] = useState({
    id: auction?.id || "",
  });

  const [productCategoryData, setProductCategoryData] = useState({
    id: productCategory?.id || "",
  });

  const [auctionCategoryData, setAuctionCategoryData] = useState({
    id: auctionCategory?.id || "",
  });

  // DELETE request handlers for each category
  const handleProductDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productData)); // Dispatch DELETE action to update the product
  };

  const handleAuctionDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAuction(auctionData)); // Dispatch DELETE action to update the auction
  };

  const handleProductCategoryDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProductCategory(productCategoryData)); // Dispatch DELETE action to update product category
  };

  const handleAuctionCategoryDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAuctionCategory(auctionCategoryData)); // Dispatch DELETE action to update auction category
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* Product DELETE Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Delete Product
          </h2>
          <form onSubmit={handleProductDelete} className="space-y-4">
            <input
              type="text"
              name="id"
              value={productData.id}
              onChange={(e) =>
                setProductData({ ...productData, id: e.target.value })
              }
              placeholder="Product Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Delete Product
            </button>
          </form>
        </section>

        {/* Auction DELETE Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Delete Auction
          </h2>
          <form onSubmit={handleAuctionDelete} className="space-y-4">
            <input
              type="text"
              name="id"
              value={auctionData.id}
              onChange={(e) =>
                setAuctionData({ ...auctionData, id: e.target.value })
              }
              placeholder="Auction Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Delete Auction
            </button>
          </form>
        </section>

        {/* Product Category DELETE Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Delete Product Category
          </h2>
          <form onSubmit={handleProductCategoryDelete} className="space-y-4">
            <input
              type="text"
              name="id"
              value={productCategoryData.id}
              onChange={(e) =>
                setProductCategoryData({
                  ...productCategoryData,
                  id: e.target.value,
                })
              }
              placeholder="Category Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Delete Product Category
            </button>
          </form>
        </section>

        {/* Auction Category DELETE Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Delete Auction Category
          </h2>
          <form onSubmit={handleAuctionCategoryDelete} className="space-y-4">
            <input
              type="text"
              name="id"
              value={auctionCategoryData.id}
              onChange={(e) =>
                setAuctionCategoryData({
                  ...auctionCategoryData,
                  id: e.target.value,
                })
              }
              placeholder="Category Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Delete Auction Category
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default TestDeleteApiPage;
