import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

function ProtectedRoute({ children, roles, user }) {
  const { isAuthenticated } = useAuth();
  const auth = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user) return <Loading />;
  if (auth.isLoading) return <Loading />;

  if (roles) {
    if (roles.includes(auth.user?.role)) {
      return children;
    } else {
      return <Navigate to="/auction-frontend/" />;
    }
  }

  if (!auth.user) return <Navigate to="/auction-frontend/" />;
  return children;
}

export default ProtectedRoute;
