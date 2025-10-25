// @desc    PrivateRoute - Protects routes from unauthorized access; redirects unauthenticated users to login
// @route   Frontend Routing Component
// @access  Private (Authenticated users only)

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Case 1: User not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Case 2: User logged in but lacks permission → redirect to home
  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  // ✅ Case 3: Authorized user → allow access
  return children;
};

export default PrivateRoute;

