import React, { useState } from "react";

// Dummy data for products and categories
const products = ["Product 1", "Product 2", "Product 3"];
const categories = ["Electronics", "Clothing", "Home", "Toys", "Books"];

const StartAuctionPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    product: "",
    category: "",
    condition: "new",
    startingPrice: "",
    minBidInterval: "",
    auctionStartTime: "",
    auctionEndTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log(formData);
  };

  return (
    <div className="size-full bg-gray-100 p-2">
      <div className="max-w-4xl mx-auto bg-white p-2 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Create a New Auction</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Product */}
          <div className="mb-4">
            <label htmlFor="product" className="block text-gray-700">
              Product
            </label>
            <select
              id="product"
              name="product"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div className="mb-4">
            <label htmlFor="condition" className="block text-gray-700">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Starting Price */}
          <div className="mb-4">
            <label htmlFor="startingPrice" className="block text-gray-700">
              Starting Price
            </label>
            <input
              id="startingPrice"
              name="startingPrice"
              type="number"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.startingPrice}
              onChange={handleChange}
              required
            />
          </div>

          {/* Minimum Bid Interval */}
          <div className="mb-4">
            <label htmlFor="minBidInterval" className="block text-gray-700">
              Minimum Bid Interval
            </label>
            <input
              id="minBidInterval"
              name="minBidInterval"
              type="number"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.minBidInterval}
              onChange={handleChange}
              required
            />
          </div>

          {/* Auction Start Time */}
          <div className="mb-4">
            <label htmlFor="auctionStartTime" className="block text-gray-700">
              Auction Start Time
            </label>
            <input
              id="auctionStartTime"
              name="auctionStartTime"
              type="datetime-local"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.auctionStartTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Auction End Time */}
          <div className="mb-4">
            <label htmlFor="auctionEndTime" className="block text-gray-700">
              Auction End Time
            </label>
            <input
              id="auctionEndTime"
              name="auctionEndTime"
              type="datetime-local"
              className="w-full px-4 py-2 border rounded-md"
              value={formData.auctionEndTime}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartAuctionPage;
