import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import AuctionPage from "./pages/AuctionPage";
import AuctionsPage from "./pages/AuctionsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyAuctionsPage from "./pages/MyAuctionsPage";
import RegisterPage from "./pages/RegisterPage";
import StartAuctionPage from "./pages/StartAuctionPage";
import TestGetApiPage from "./pages/TestGetApiPage";
import { checkAuth } from "./store/slices/authSlice";
import TestPostApiPage from "./pages/TestPostApiPage";
import TestPatchApiPage from "./pages/TestPatchApiPage";
import TestDeleteApiPage from "./pages/TestDeleteApiPage";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if (isLoading) return <Loading />;

  return (
    <AuthProvider>
      <div className="h-screen flex flex-col">
        <Router>
          <Navbar />
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              {/* Kullanıcı Tarafı */}
              {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          /> */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auctions" element={<AuctionsPage />} />
              <Route path="/my-auctions" element={<MyAuctionsPage />} />
              <Route path="/auction/create" element={<StartAuctionPage />} />
              <Route path="/auction/:auctionId" element={<AuctionPage />} />
              <Route path="/product/create" element={<AddProductPage />} />
              <Route path="/getapi" element={<TestGetApiPage />} />
              <Route path="/postapi" element={<TestPostApiPage />} />
              <Route path="/patchapi" element={<TestPatchApiPage />} />
              <Route path="/deleteapi" element={<TestDeleteApiPage />} />

              {/* Admin Tarafı */}
              {/* <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminRoutes />
              </ProtectedRoute>
            }
          /> */}

              {/* Public Rotalar */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 404 Sayfası */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          )}
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
