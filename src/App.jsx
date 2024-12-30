import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import AuctionPage from "./pages/AuctionPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestDeleteApiPage from "./pages/TestDeleteApiPage";
import TestGetApiPage from "./pages/TestGetApiPage";
import TestPatchApiPage from "./pages/TestPatchApiPage";
import TestPostApiPage from "./pages/TestPostApiPage";
import { checkAuth } from "./store/slices/authSlice";

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
              <Route path="/" element={<HomePage />} />
              <Route path="/auction/:auctionId" element={<AuctionPage />} />
              <Route path="/getapi" element={<TestGetApiPage />} />
              <Route path="/postapi" element={<TestPostApiPage />} />
              <Route path="/patchapi" element={<TestPatchApiPage />} />
              <Route path="/deleteapi" element={<TestDeleteApiPage />} />

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
