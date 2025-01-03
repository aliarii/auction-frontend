import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const handleNavigate = (target) => {
    navigate(target);
  };
  const handleMiddleClick = (event, target) => {
    if (event.button === 1) {
      // Mouse tekerleği tıklama (button === 1)
      window.open(target, "_blank"); // Yeni sekmede aç
    } else {
      handleNavigate(target); // Normal tıklama işlemi
    }
  };
  return (
    <div className="flex flex-row justify-between items-center m-2 min-h-14 h-14 rounded-lg bg-dark-1 text-xl text-light-2 font-semibold">
      <div className="flex flex-row items-center h-full w-full gap-5 p-2 ">
        <p
          className="cursor-pointer"
          onClick={() => handleNavigate("/")}
          onAuxClick={(e) => handleMiddleClick(e, "/")}
        >
          Auction.com
        </p>
        <p
          className="cursor-pointer"
          onClick={() => handleNavigate("/")}
          onAuxClick={(e) => handleMiddleClick(e, "/")}
        >
          Home
        </p>
        <p
          className="cursor-pointer"
          onClick={() => handleNavigate("/auctions")}
          onAuxClick={(e) => handleMiddleClick(e, "/auctions")}
        >
          Auctions
        </p>
        {role === "admin" && (
          <>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/admin")}
              onAuxClick={(e) => handleMiddleClick(e, "/admin")}
            >
              Admin
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/getapi")}
              onAuxClick={(e) => handleMiddleClick(e, "/getapi")}
            >
              Get
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/postapi")}
              onAuxClick={(e) => handleMiddleClick(e, "/postapi")}
            >
              Post
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/patchapi")}
              onAuxClick={(e) => handleMiddleClick(e, "/patchapi")}
            >
              Patch
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/deleteapi")}
              onAuxClick={(e) => handleMiddleClick(e, "/deleteapi")}
            >
              Delete
            </p>
          </>
        )}
      </div>
      <div className="flex flex-row items-center w-fit gap-5 p-2">
        {auth?.isAuthenticated && auth?.user ? (
          <>
            <p className="cursor-pointer">
              {auth?.user ? auth?.user.name : "Loading..."}
            </p>
            <p className="cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </>
        ) : (
          <>
            <p
              className="cursor-pointer"
              onClick={() => handleNavigate("/login")}
              onAuxClick={(e) => handleMiddleClick(e, "/login")}
            >
              Login
            </p>
            <a
              className="cursor-pointer"
              onClick={() => handleNavigate("/register")}
              onAuxClick={(e) => handleMiddleClick(e, "/register")}
            >
              Register
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
