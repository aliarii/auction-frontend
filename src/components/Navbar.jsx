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
    <div className="flex flex-row justify-between items-center m-2 min-h-14 h-14 rounded-lg bg-dark-1 text-xl text-light-2 font-semibold">
      <div className="flex flex-row items-center h-full w-full gap-5 p-2 ">
        <Link to={`/`}>Auction.com</Link>
        <Link to={`/`}>Ana Sayfa</Link>

        <Link to={`/auctions`}>Açık Arttırmalar</Link>
        {role === "admin" && (
          <>
            <Link to={`/admin`}>Admin</Link>
            {/* <Link to={`/getapi`}>Get</Link>
            <Link to={`/postapi`}>Post</Link>
            <Link to={`/patchapi`}>Patch</Link>
            <Link to={`/deleteapi`}>Delete</Link> */}
          </>
        )}
      </div>
      <div className="flex flex-row items-center w-fit whitespace-nowrap gap-5 p-2">
        {auth?.isAuthenticated && auth?.user ? (
          <>
            {/* <p className="cursor-pointer">
              {auth?.user ? auth?.user.name : "Loading..."}
            </p> */}
            <Link to={"/profile"}>
              {auth?.user ? auth?.user.name : "Loading..."}
            </Link>
            <p className="cursor-pointer" onClick={handleLogout}>
              Çıkış
            </p>
          </>
        ) : (
          <>
            <Link to={`/login`}>Giriş Yap</Link>
            <Link to={`/register`}>Kayıt Ol</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
