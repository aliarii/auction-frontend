import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const { user, isLoading } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (isLoading) return <Loading />;
  if (user && role === "admin" && isAdmin) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
