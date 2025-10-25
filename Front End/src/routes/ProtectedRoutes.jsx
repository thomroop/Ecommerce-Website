// @desc    ProtectedRoute - Restricts access to authenticated users and supports role-based control
// @route   Frontend Routing Guard
// @access  Private (User / Admin based on role)

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

/**
 * ✅ Usage Examples:
 * 
 * 🔒 General (any logged-in user):
 *    <Route element={<ProtectedRoute />}>
 *       <Route path="/profile" element={<ProfilePage />} />
 *    </Route>
 * 
 * 👑 Admin-only access:
 *    <Route element={<ProtectedRoute requiredRole="Admin" />}>
 *       <Route path="/admin/*" element={<AdminPage />} />
 *    </Route>
 * 
 * 🛍️ User checkout (both User & Admin can access):
 *    <Route element={<ProtectedRoute requiredRole="User" />}>
 *       <Route path="/checkout" element={<CheckoutPage />} />
 *    </Route>
 */

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useContext(AuthContext);

  // 🧭 Case 1: User not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Case 2: Role mismatch → redirect to home
  // Allow admin access for user routes (flexible)
  if (
    requiredRole &&
    ![requiredRole.toLowerCase(), "admin"].includes(user.role?.toLowerCase())
  ) {
    return <Navigate to="/" replace />;
  }

  // ✅ Case 3: Authorized → show nested route content
  return <Outlet />;
};

export default ProtectedRoute;

