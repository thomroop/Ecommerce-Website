// @desc    ProtectedRoute - Restricts access to authenticated users and supports role-based control
// @route   Frontend Routing Guard
// @access  Private (User / Admin based on role)

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, token, loading } = useContext(AuthContext);

  // ✅ Safe to log here (inside component after user is defined)
  console.log("🧭 ProtectedRoute check:", {
    user,
    token,
    loading,
    role: user?.role,
  });

  // ⏳ Wait for AuthContext to finish checking profile
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-teal-700 text-lg font-semibold">
        Checking authorization...
      </div>
    );
  }

  // 🚫 Case 1: Not logged in → redirect to login
  if (!user || !token) {
    console.warn("🚫 Not logged in — redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // 🚫 Case 2: Role mismatch → redirect to home
  if (
    requiredRole &&
    ![requiredRole.toLowerCase(), "admin"].includes(user.role?.toLowerCase())
  ) {
    console.warn("🚫 Role mismatch — redirecting to home");
    return <Navigate to="/" replace />;
  }

  // ✅ Case 3: Authorized → render nested content
  return <Outlet />;
};

export default ProtectedRoute;


