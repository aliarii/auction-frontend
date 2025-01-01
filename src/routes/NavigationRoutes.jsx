import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuctionPage from "../pages/AuctionPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TestDeleteApiPage from "../pages/TestDeleteApiPage";
import TestGetApiPage from "../pages/TestGetApiPage";
import TestPatchApiPage from "../pages/TestPatchApiPage";
import TestPostApiPage from "../pages/TestPostApiPage";
import ProtectedRoute from "./ProtectedRoute";

const NavigationRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auction/:auctionId" element={<AuctionPage />} />

        <Route
          path="/getapi"
          element={
            <ProtectedRoute role="admin">
              <TestGetApiPage />
            </ProtectedRoute>
          }
        />
        <Route path="/postapi" element={<TestPostApiPage />} />
        <Route path="/patchapi" element={<TestPatchApiPage />} />
        <Route path="/deleteapi" element={<TestDeleteApiPage />} />

        {/* Public Rotalar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 Sayfası */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default NavigationRoutes;
