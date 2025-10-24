import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user exists, render the page; otherwise redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
