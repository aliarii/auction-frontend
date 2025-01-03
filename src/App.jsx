import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import AuctionPage from "./pages/AuctionPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestDeleteApiPage from "./pages/TestDeleteApiPage";
import TestGetApiPage from "./pages/TestGetApiPage";
import TestPatchApiPage from "./pages/TestPatchApiPage";
import TestPostApiPage from "./pages/TestPostApiPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { logoutUser, validateToken } from "./store/slices/authSlice";
import AuctionsPage from "./pages/AuctionsPage";
import { UserProvider } from "./contexts/UserContext";
import AdminPage from "./pages/AdminPage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      dispatch(validateToken(jwt)).then((data) => {
        if (!data.payload) {
          dispatch(logoutUser());
        }
      });
    }
  }, [dispatch]);

  return (
    <UserProvider>
      <div className="h-screen flex flex-col bg-dark-7">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/auction/:auctionId"
            element={
              <ProtectedRoute role="user" user={user}>
                <AuctionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auctions"
            element={
              <ProtectedRoute role="user" user={user}>
                <AuctionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin" user={user}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/getapi"
            element={
              <ProtectedRoute role="admin" user={user}>
                <TestGetApiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postapi"
            element={
              <ProtectedRoute role="admin" user={user}>
                <TestPostApiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patchapi"
            element={
              <ProtectedRoute role="admin" user={user}>
                <TestPatchApiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deleteapi"
            element={
              <ProtectedRoute role="admin" user={user}>
                <TestDeleteApiPage />
              </ProtectedRoute>
            }
          />

          {/* Public Rotalar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 404 Sayfası */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
