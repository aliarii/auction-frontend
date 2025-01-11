// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { logoutUser } from "../store/slices/authSlice";
// import { useUser } from "../contexts/UserContext";

// function Navbar() {
//   const auth = useSelector((state) => state.auth);
//   const { role, setRole } = useUser();
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     setRole("");
//     logout();
//     await dispatch(logoutUser());
//     navigate("/");
//   };

//   return (
//     <div className="flex flex-row justify-between items-center min-h-14 h-14 px-16 bg-white border-b-2 border-green-400 shadow-md shadow-green-100">
//       <div className="flex flex-row items-center h-full w-full gap-5 p-2 ">
//         <Link to={`/`} className="text-2xl font-bold">
//           Auction.com
//         </Link>
//         <Link to={`/`}>Home</Link>

//         <Link to={`/auctions`}>Auctions</Link>
//         {role === "admin" && <Link to={`/admin`}>Admin</Link>}
//       </div>
//       <div className="flex flex-row items-center w-fit whitespace-nowrap gap-5 p-2">
//         {auth?.isAuthenticated && auth?.user ? (
//           <>
//             <Link to={"/profile"}>
//               {auth?.user ? auth?.user.name : "Loading..."}
//             </Link>
//             <p className="cursor-pointer" onClick={handleLogout}>
//               Logout
//             </p>
//           </>
//         ) : (
//           <>
//             <Link to={`/login`}>Login</Link>
//             <Link to={`/register`}>Register</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../store/slices/authSlice";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";

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
    navigate("/");
  };

  return (
    <div className="flex flex-row items-center min-h-14 h-14 md:px-16 bg-white border-b-2 border-green-400 shadow-md shadow-green-100">
      <div className="flex flex-row items-center h-full w-full gap-2 p-2 ">
        <LuMenu
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <Link to={`/`} className="text-2xl font-bold">
          Auction.com
        </Link>

        <div className="hidden md:flex flex-row pl-3 gap-5">
          <Link to={`/`}>Home</Link>

          <Link to={`/auctions`}>Auctions</Link>
          {role === "admin" && <Link to={`/admin`}>Admin</Link>}
        </div>
      </div>

      {/* Links for large screens */}
      <div className="hidden md:flex flex-row items-center w-fit whitespace-nowrap gap-5 p-2">
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
            to={`/`}
            className="min-h-14 h-14 text-center content-center border-b-2 border-green-400 text-2xl font-bold"
          >
            Auction.com
          </Link>

          <div className="flex flex-col items-center size-full text-lg py-2 gap-5">
            <Link to={`/`} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to={`/auctions`} onClick={() => setMenuOpen(false)}>
              Auctions
            </Link>
            {role === "admin" && (
              <Link to={`/admin`} onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center h-fit w-full gap-5 text-lg">
            {auth?.isAuthenticated && auth?.user ? (
              <>
                <Link to={"/profile"} onClick={() => setMenuOpen(false)}>
                  {auth?.user ? auth?.user.name : "Loading..."}
                </Link>
                <p className="cursor-pointer " onClick={handleLogout}>
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link to={`/login`} onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to={`/register`} onClick={() => setMenuOpen(false)}>
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
