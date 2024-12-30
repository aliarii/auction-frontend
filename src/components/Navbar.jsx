import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-fit flex flex-row justify-between items-center bg-dark-4">
      <div className="flex flex-row w-full gap-5 p-2">
        <a href="/">Auction.com</a>
        <a href="/">Home</a>
        {/* <a href="/auctions">Auctions</a>
        <a href="/my-auctions">My Auctions</a>
        <a href="/auction/create">Create Auctions</a>
        <a href="/product/create">Add Product</a> */}
        <a href="/getapi">Get</a>
        <a href="/postapi">Post</a>
        <a href="/patchapi">Patch</a>
        <a href="/deleteapi">Delete</a>
        {/* {user?.role === "admin" && <a href="/start-auction">Start Auction</a>} */}
      </div>
      <div className="flex flex-row w-fit gap-5 p-2">
        <a href="/login">Login</a>
        <h1 className="cursor-pointer" onClick={handleLogout}>
          Logout
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
