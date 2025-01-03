import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

function ProtectedRoute({ children, role, user }) {
  const { isAuthenticated } = useAuth();
  const auth = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user) return <Loading />;
  if (auth.isLoading) return <Loading />;

  if (role) {
    if (role === "admin") {
      if (auth && auth.user?.role === "admin") return children;
      else return <Navigate to="/" />;
    } else if (role === "user") {
      if (auth && auth.user) return children;
      else return <Navigate to="/" />;
    } else return <Navigate to="/" />;
  }
  if (!auth.user) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
