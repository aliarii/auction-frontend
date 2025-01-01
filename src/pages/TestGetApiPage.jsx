import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuctions } from "../store/slices/auctionSlice";
import {
  getAuctionCategories,
  getProductCategories,
} from "../store/slices/categorySlice";
import { getProducts } from "../store/slices/productSlice";
import { getUsers } from "../store/slices/userSlice";

function TestGetApiPage() {
  // State variables to hold the data
  const { products } = useSelector((state) => state.product);
  const { auctions } = useSelector((state) => state.auction);
  const { users } = useSelector((state) => state.user);
  const { productCategories } = useSelector((state) => state.category);
  const { auctionCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Fetch data from all APIs
  useEffect(() => {
    if (!products) dispatch(getProducts());
    if (!auctions) dispatch(getAuctions());
    if (!users) dispatch(getUsers());
    if (!productCategories) dispatch(getProductCategories());
    if (!auctionCategories) dispatch(getAuctionCategories());
  }, [
    dispatch,
    products,
    auctions,
    users,
    productCategories,
    auctionCategories,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* Products Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            {products ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(products, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Loading products...</p>
            )}
          </div>
        </section>

        {/* Auctions Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Auctions</h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            {auctions ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(auctions, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Loading auctions...</p>
            )}
          </div>
        </section>

        {/* Users Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            {users ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(users, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Loading users...</p>
            )}
          </div>
        </section>
        {/* Product Category Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Product Categories
          </h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            {productCategories ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(productCategories, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Loading productCategories...</p>
            )}
          </div>
        </section>
        {/* Auction Category Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Auction Categories
          </h2>
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            {auctionCategories ? (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(auctionCategories, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Loading auctionCategories...</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TestGetApiPage;
