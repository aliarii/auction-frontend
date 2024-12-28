import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorProvider } from "./contexts/ErrorContext";
import { UserProvider } from "./contexts/UserContext";
import { AuctionProvider } from "./contexts/AuctionContext";
import { NotificationProvider } from "./contexts/NotificationContext";

import ErrorAlert from "./components/ErrorAlert";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoutes from "./routes/AdminRoutes";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Auctions from "./pages/user/Auctions";
import AuctionDetails from "./pages/user/AuctionDetails";
import Categories from "./pages/user/Categories";
import Profile from "./pages/user/Profile";
import WonAuctions from "./pages/user/WonAuctions";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <NotificationProvider>
      <ErrorProvider>
        <UserProvider>
          <AuctionProvider>
            <Router>
              <Header />
              <main className="p-4">
                <ErrorAlert />
                <Routes>
                  {/* Kullanıcı Tarafı */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Auctions />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/auctions/:id"
                    element={
                      <ProtectedRoute>
                        <AuctionDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <ProtectedRoute>
                        <Categories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/won-auctions"
                    element={
                      <ProtectedRoute>
                        <WonAuctions />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Tarafı */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute role="admin">
                        <AdminRoutes />
                      </ProtectedRoute>
                    }
                  />

                  {/* Public Rotalar */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* 404 Sayfası */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </Router>
          </AuctionProvider>
        </UserProvider>
      </ErrorProvider>
    </NotificationProvider>
  );
}

export default App;
