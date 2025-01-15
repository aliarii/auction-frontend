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
    <div className="sticky top-0 z-[40] flex h-14 min-h-14 flex-row items-center border-b-2 border-green-400 bg-white shadow-md shadow-green-100 md:px-16">
      <div className="flex h-full w-full flex-row items-center gap-2 p-2">
        <LuMenu
          className="text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Link to={`/auction-frontend/`} className="text-2xl font-bold">
          Auction.com
        </Link>

        <div className="hidden flex-row gap-5 pl-3 md:flex">
          <Link to={`/auction-frontend/`}>Home</Link>

          <Link to={`/auction-frontend/auctions`}>Auctions</Link>
          {role === "admin" && (
            <Link to={`/auction-frontend/admin`}>Admin</Link>
          )}
        </div>
      </div>

      {/* Links for large screens */}
      <div className="hidden w-fit flex-row items-center gap-5 whitespace-nowrap p-2 md:flex">
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
      className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 transition-all ${
        menuOpen ? "block" : "hidden"
      }`}
      onClick={() => setMenuOpen(false)} // Close menu when clicking outside
    >
      <div
        className={`fixed left-0 top-0 h-full w-52 bg-white shadow-lg transition-all ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-2 pb-6">
          <Link
            to={`/auction-frontend/`}
            className="h-14 min-h-14 content-center border-b-2 border-green-400 text-center text-2xl font-bold"
          >
            Auction.com
          </Link>

          <div className="flex size-full flex-col items-center gap-5 py-2 text-lg">
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

          <div className="flex h-fit w-full flex-col items-center gap-5 text-lg">
            {auth?.isAuthenticated && auth?.user ? (
              <>
                <Link
                  to={"/auction-frontend/profile"}
                  onClick={() => setMenuOpen(false)}
                >
                  {auth?.user ? auth?.user.name : "Loading..."}
                </Link>
                <p className="cursor-pointer" onClick={handleLogout}>
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
