import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../store/slices/authSlice";

function Navbar() {
  const auth = useSelector((state) => state.auth);

  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    logout();
    await dispatch(logoutUser());
    navigate("/");
  };
  const handleNavigateLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-row justify-between items-center m-2 min-h-14 h-14 rounded-lg bg-dark-1 text-xl text-light-2 font-semibold">
      <div className="flex flex-row items-center h-full w-full gap-5 p-2 ">
        <a href="/">Auction.com</a>
        <a href="/">Home</a>
        <a href="/auctions">Auctions</a>
        {auth?.user?.role === "admin" && (
          <>
            <a href="/getapi">Get</a>
            <a href="/postapi">Post</a>
            <a href="/patchapi">Patch</a>
            <a href="/deleteapi">Delete</a>
          </>
        )}
      </div>
      <div className="flex flex-row items-center w-fit gap-5 p-2">
        {auth?.isAuthenticated && auth?.user ? (
          <>
            <h1 className="cursor-pointer">
              {auth?.user ? auth?.user.name : "Loading..."}
            </h1>
            <h1 className="cursor-pointer" onClick={handleLogout}>
              Logout
            </h1>
          </>
        ) : (
          <>
            <h1 className="cursor-pointer" onClick={handleNavigateLogin}>
              Login
            </h1>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
