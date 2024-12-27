import React from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children, role, requiredRole }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/products" replace />;
    }

    return children;
}

export default ProtectedRoute;
