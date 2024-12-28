import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const user = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgisi localStorage'dan alınır
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
