import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const { isLoading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <></>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // if (role && user.role !== role) {
  //   return <Navigate to="/" />;
  // }

  return children;
}

export default ProtectedRoute;
