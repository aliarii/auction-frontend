import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct";
import PlaceBid from "./components/Bids/PlaceBid";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />

          <Route path="/auctions/:auctionId" element={<ProtectedRoute><PlaceBid /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
