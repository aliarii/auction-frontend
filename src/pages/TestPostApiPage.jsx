import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuction } from "../store/slices/auctionSlice"; // Example POST action for auction
import {
  createAuctionCategory,
  createProductCategory,
  getAuctionCategories,
} from "../store/slices/categorySlice"; // Example POST actions for categories
import { createProduct, getProducts } from "../store/slices/productSlice"; // Example POST action for product
import { checkAuth } from "../store/slices/authSlice";
import { createBid } from "../store/slices/bidSlice";

function TestPostApiPage() {
  // State variables to hold the data
  const { products, product } = useSelector((state) => state.product);
  const { auctions, auction } = useSelector((state) => state.auction);
  // const { users, user } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { productCategories, productCategory } = useSelector(
    (state) => state.category
  );
  const { auctionCategories, auctionCategory } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) dispatch(getProducts());
    if (!auctionCategories) dispatch(getAuctionCategories());
    if (!user) dispatch(checkAuth());
  }, [dispatch, products, auctionCategories]);

  // Local state for POST request payloads
  const [productData, setProductData] = useState({
    name: "",
    quantity: 1,
    description: "",
    category: null, // Category ID
    image: "",
  });
  const [bidData, setBidData] = useState({
    auctionId: "",
    user: null,
    amount: "",
  });
  const [auctionData, setAuctionData] = useState({
    title: "",
    description: "",
    product: "", // Product ID
    category: null, // AuctionCategory ID
    condition: "New", // "New" or "Used"
    status: "Pending",
    startingPrice: 0,
    auctionStartTime: "",
    auctionEndTime: "",
  });
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [productCategoryData, setProductCategoryData] = useState({
    name: "",
    image: "",
  });
  const [auctionCategoryData, setAuctionCategoryData] = useState({
    name: "",
    image: "",
  });

  // POST request handlers
  const handleProductSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    bidData.user = user;
    dispatch(createBid(bidData));
  };

  const handleAuctionSubmit = (e) => {
    e.preventDefault();
    dispatch(createAuction(auctionData));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // dispatch(createUs(userData));
  };

  const handleProductCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(createProductCategory(productCategoryData));
  };

  const handleAuctionCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(createAuctionCategory(auctionCategoryData));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* Product POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Product
          </h2>
          <form onSubmit={handleProductSubmit} className="space-y-4">
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
              Add Product
            </button>
          </form>
        </section>

        {/* Product POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Create Bid
          </h2>
          <form onSubmit={handleBidSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={bidData.auctionId}
              onChange={(e) =>
                setBidData({ ...bidData, auctionId: e.target.value })
              }
              placeholder="Auction Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="quantity"
              value={bidData.amount}
              onChange={(e) =>
                setBidData({ ...bidData, amount: +e.target.value })
              }
              placeholder="Amount"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Create Bid
            </button>
          </form>
        </section>

        {/* Auction POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Auction
          </h2>
          <form onSubmit={handleAuctionSubmit} className="space-y-4">
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
            <select
              name="product"
              value={auctionData.product || ""}
              onChange={(e) =>
                setAuctionData({ ...auctionData, product: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Product</option>
              {products &&
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
            <select
              name="category"
              value={auctionData.category || ""}
              onChange={(e) =>
                setAuctionData({ ...auctionData, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Auction Category</option>
              {auctionCategories &&
                auctionCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
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

            <select
              name="status"
              value={auctionData.status}
              onChange={(e) =>
                setAuctionData({ ...auctionData, status: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
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
              Add Auction
            </button>
          </form>
        </section>

        {/* User POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add User</h2>
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-indigo-700"
            >
              Add User
            </button>
          </form>
        </section>

        {/* Product Category POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Product Category
          </h2>
          <form onSubmit={handleProductCategorySubmit} className="space-y-4">
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
              Add Product Category
            </button>
          </form>
        </section>

        {/* Auction Category POST Form */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add Auction Category
          </h2>
          <form onSubmit={handleAuctionCategorySubmit} className="space-y-4">
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
              Add Auction Category
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default TestPostApiPage;
