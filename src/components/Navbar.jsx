import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { logoutUser } from "../store/slices/authSlice";

function Navbar() {
  const auth = useSelector((state) => state.auth);
  const { role, setRole } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false); // To toggle the menu on small screens

  const handleLogout = async () => {
    setRole("");
    logout();
    await dispatch(logoutUser());
    navigate("/auction-frontend/");
  };

  return (
    <div className="sticky top-0 z-[40] flex flex-row items-center min-h-14 h-14 md:px-16 bg-white border-b-2 border-green-400 shadow-md shadow-green-100">
      <div className="flex flex-row items-center h-full w-full gap-2 p-2 ">
        <LuMenu
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Link to={`/auction-frontend/`} className="text-2xl font-bold">
          Auction.com
        </Link>

        <div className="hidden md:flex flex-row pl-3 gap-5">
          <Link to={`/auction-frontend/`}>Home</Link>

          <Link to={`/auction-frontend/auctions`}>Auctions</Link>
          {role === "admin" && (
            <Link to={`/auction-frontend/admin`}>Admin</Link>
          )}
        </div>
      </div>

      {/* Links for large screens */}
      <div className="hidden md:flex flex-row items-center w-fit whitespace-nowrap gap-5 p-2">
        {auth?.isAuthenticated && auth?.user ? (
          <>
            <Link to={"/auction-frontend/profile"}>
              {auth?.user ? auth?.user.name : "Loading..."}
            </Link>
            <p className="cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </>
        ) : (
          <>
            <Link to={`/auction-frontend/login`}>Login</Link>
            <Link to={`/auction-frontend/register`}>Register</Link>
          </>
        )}
      </div>

      {/* Side menu for small screens */}
      <SideMenu
        auth={auth}
        role={role}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default Navbar;

const SideMenu = ({ auth, role, menuOpen, setMenuOpen, handleLogout }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-all ${
        menuOpen ? "block" : "hidden"
      }`}
      onClick={() => setMenuOpen(false)} // Close menu when clicking outside
    >
      <div
        className={`fixed left-0 top-0 w-52 bg-white h-full shadow-lg transition-all ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between pb-6 px-2 h-full">
          <Link
            to={`/auction-frontend/`}
            className="min-h-14 h-14 text-center content-center border-b-2 border-green-400 text-2xl font-bold"
          >
            Auction.com
          </Link>

          <div className="flex flex-col items-center size-full text-lg py-2 gap-5">
            <Link to={`/auction-frontend/`} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link
              to={`/auction-frontend/auctions`}
              onClick={() => setMenuOpen(false)}
            >
              Auctions
            </Link>
            {role === "admin" && (
              <Link
                to={`/auction-frontend/admin`}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center h-fit w-full gap-5 text-lg">
            {auth?.isAuthenticated && auth?.user ? (
              <>
                <Link
                  to={"/auction-frontend/profile"}
                  onClick={() => setMenuOpen(false)}
                >
                  {auth?.user ? auth?.user.name : "Loading..."}
                </Link>
                <p className="cursor-pointer " onClick={handleLogout}>
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link
                  to={`/auction-frontend/login`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to={`/auction-frontend/register`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
