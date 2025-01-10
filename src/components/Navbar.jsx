import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../store/slices/authSlice";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const auth = useSelector((state) => state.auth);
  const { role, setRole } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setRole("user");
    logout();
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between items-center min-h-14 h-14 px-16 bg-white border-b-2 border-green-400 shadow-md shadow-green-100">
      <div className="flex flex-row items-center h-full w-full gap-5 p-2 ">
        <Link to={`/`}>Auction.com</Link>
        <Link to={`/`}>Home</Link>

        <Link to={`/auctions`}>Auctions</Link>
        {role === "admin" && <Link to={`/admin`}>Admin</Link>}
      </div>
      <div className="flex flex-row items-center w-fit whitespace-nowrap gap-5 p-2">
        {auth?.isAuthenticated && auth?.user ? (
          <>
            <Link to={"/profile"}>
              {auth?.user ? auth?.user.name : "Loading..."}
            </Link>
            <p className="cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </>
        ) : (
          <>
            <Link to={`/login`}>Login</Link>
            <Link to={`/register`}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
