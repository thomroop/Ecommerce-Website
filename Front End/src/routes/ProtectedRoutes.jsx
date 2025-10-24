import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

/**
 * ✅ ProtectedRoute component
 * 
 * Usage:
 *  <ProtectedRoute /> → Protects route for any logged-in user
 *  <ProtectedRoute requiredRole="Admin" /> → Only Admins can access
 *  <ProtectedRoute requiredRole="User" /> → Only regular Users can access
 */
const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);

  // ✅ Case 1: User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Case 2: Role mismatch
  // Example: requiredRole = "Admin" but user.role = "User"
  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ Case 3: User is authorized — show the nested routes
  return <Outlet />;
};

export default ProtectedRoute;

