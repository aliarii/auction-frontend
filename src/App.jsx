import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import AdminPage from "./pages/AdminPage";
import AuctionPage from "./pages/AuctionPage";
import AuctionsPage from "./pages/AuctionsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { logoutUser, validateToken } from "./store/slices/authSlice";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      dispatch(validateToken(jwt)).then((data) => {
        if (!data.payload) {
          logout();
          dispatch(logoutUser());
        }
      });
    }
  }, [dispatch]);

  return (
    <UserProvider>
      <div className="flex h-screen w-full flex-col overflow-auto bg-light-2 font-poppins">
        <Navbar />
        <Routes>
          <Route path="/auction-frontend/" element={<HomePage />} />
          <Route path="/auction-frontend/auctions" element={<AuctionsPage />} />
          <Route
            path="/auction-frontend/profile"
            element={
              <ProtectedRoute roles={["user", "admin"]} user={user}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction-frontend/auction/:auctionId"
            element={
              <ProtectedRoute roles={["user", "admin"]} user={user}>
                <AuctionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auction-frontend/admin"
            element={
              <ProtectedRoute roles={["admin"]} user={user}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/auction-frontend/login" element={<LoginPage />} />
          <Route path="/auction-frontend/register" element={<RegisterPage />} />

          {/* 404 Sayfası */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
