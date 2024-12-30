import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/slices/productSlice"; // PATCH action for product
import { updateAuction } from "../store/slices/auctionSlice"; // PATCH action for auction
import { updateProductCategory } from "../store/slices/categorySlice"; // PATCH action for productCategory
import { updateAuctionCategory } from "../store/slices/categorySlice"; // PATCH action for auctionCategory

function TestPatchApiPage() {
  const { product } = useSelector((state) => state.product); // Get current product data from store
  const { auction } = useSelector((state) => state.auction); // Get current auction data from store
  const { productCategory } = useSelector((state) => state.category); // Get current product category data
  const { auctionCategory } = useSelector((state) => state.category); // Get current auction category data
  const dispatch = useDispatch();

  // Local state for PATCH request payloads for each category
  const [productData, setProductData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    quantity: product?.quantity || 1,
    description: product?.description || "",
    category: product?.category || null, // Category ID
    image: product?.image || "",
  });

  const [auctionData, setAuctionData] = useState({
    id: auction?.id || "",
    title: auction?.title || "",
    description: auction?.description || "",
    product: auction?.product || "", // Product ID
    category: auction?.category || null, // Auction Category ID
    condition: auction?.condition || "New", // "New" or "Used"
    startingPrice: auction?.startingPrice || 0,
    auctionStartTime: auction?.auctionStartTime || "",
    auctionEndTime: auction?.auctionEndTime || "",
  });

  const [productCategoryData, setProductCategoryData] = useState({
    id: productCategory?.id || "",
    name: productCategory?.name || "",
    image: productCategory?.image || "",
  });

  const [auctionCategoryData, setAuctionCategoryData] = useState({
    id: auctionCategory?.id || "",
    name: auctionCategory?.name || "",
    image: auctionCategory?.image || "",
  });

  // PATCH request handlers for each category
  const handleProductUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productData)); // Dispatch PATCH action to update the product
  };

  const handleAuctionUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAuction(auctionData)); // Dispatch PATCH action to update the auction
  };

  const handleProductCategoryUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProductCategory(productCategoryData)); // Dispatch PATCH action to update product category
  };

  const handleAuctionCategoryUpdate = (e) => {
    e.preventDefault();
    dispatch(updateAuctionCategory(auctionCategoryData)); // Dispatch PATCH action to update auction category
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* Product PATCH Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Product
          </h2>
          <form onSubmit={handleProductUpdate} className="space-y-4">
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
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={(e) =>
                setProductData({ ...productData, quantity: +e.target.value })
              }
              placeholder="Quantity"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              placeholder="Description"
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="category"
              value={productData.category || ""}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              placeholder="Category ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={(e) =>
                setProductData({ ...productData, image: e.target.value })
              }
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Update Product
            </button>
          </form>
        </section>

        {/* Auction PATCH Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Auction
          </h2>
          <form onSubmit={handleAuctionUpdate} className="space-y-4">
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
            <input
              type="text"
              name="title"
              value={auctionData.title}
              onChange={(e) =>
                setAuctionData({ ...auctionData, title: e.target.value })
              }
              placeholder="Auction Title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              value={auctionData.description}
              onChange={(e) =>
                setAuctionData({ ...auctionData, description: e.target.value })
              }
              placeholder="Auction Description"
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="product"
              value={auctionData.product}
              onChange={(e) =>
                setAuctionData({ ...auctionData, product: e.target.value })
              }
              placeholder="Product ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="category"
              value={auctionData.category || ""}
              onChange={(e) =>
                setAuctionData({ ...auctionData, category: e.target.value })
              }
              placeholder="Auction Category ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="condition"
              value={auctionData.condition}
              onChange={(e) =>
                setAuctionData({ ...auctionData, condition: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <input
              type="number"
              name="startingPrice"
              value={auctionData.startingPrice}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  startingPrice: +e.target.value,
                })
              }
              placeholder="Starting Price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="datetime-local"
              name="auctionStartTime"
              value={auctionData.auctionStartTime}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  auctionStartTime: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="datetime-local"
              name="auctionEndTime"
              value={auctionData.auctionEndTime}
              onChange={(e) =>
                setAuctionData({
                  ...auctionData,
                  auctionEndTime: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Update Auction
            </button>
          </form>
        </section>

        {/* Product Category PATCH Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Product Category
          </h2>
          <form onSubmit={handleProductCategoryUpdate} className="space-y-4">
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
            <input
              type="text"
              name="name"
              value={productCategoryData.name}
              onChange={(e) =>
                setProductCategoryData({
                  ...productCategoryData,
                  name: e.target.value,
                })
              }
              placeholder="Category Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="image"
              value={productCategoryData.image}
              onChange={(e) =>
                setProductCategoryData({
                  ...productCategoryData,
                  image: e.target.value,
                })
              }
              placeholder="Category Image URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Update Product Category
            </button>
          </form>
        </section>

        {/* Auction Category PATCH Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Auction Category
          </h2>
          <form onSubmit={handleAuctionCategoryUpdate} className="space-y-4">
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
            <input
              type="text"
              name="name"
              value={auctionCategoryData.name}
              onChange={(e) =>
                setAuctionCategoryData({
                  ...auctionCategoryData,
                  name: e.target.value,
                })
              }
              placeholder="Category Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="image"
              value={auctionCategoryData.image}
              onChange={(e) =>
                setAuctionCategoryData({
                  ...auctionCategoryData,
                  image: e.target.value,
                })
              }
              placeholder="Category Image URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Update Auction Category
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default TestPatchApiPage;
