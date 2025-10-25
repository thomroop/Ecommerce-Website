// @desc    AppRoute - Handles all frontend routes including public, private (admin), and fallback routes
// @route   Frontend Routing Setup
// @access  Public & Private (based on user role)

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Layout Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// ✅ Public Pages
import ProductList from "../pages/product/ProductList";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import CartPage from "../pages/cart/CartPage";

// ✅ Admin Pages
import AdminPage from "../pages/auth/AdminPage"; // Nested admin routes handled inside
import ProtectedRoute from "./ProtectedRoutes"; // Role-based route protection

const AppRoute = () => {
  return (
    <Router>
      {/* Global Navbar visible on all pages */}
      <Navbar />

      {/* Main content container */}
      <main className="min-h-[80vh] container mx-auto p-4">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:category?" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartPage />} />

          {/* ✅ Protected Admin Routes (role-based access) */}
          <Route element={<ProtectedRoute requiredRole="Admin" />}>
            <Route path="/admin/*" element={<AdminPage />} />
            {/* The * allows nested routes inside AdminPage.jsx 
                (e.g. /admin/dashboard, /admin/products, etc.) */}
          </Route>

          {/* ✅ 404 Fallback Page */}
          <Route
            path="*"
            element={
              <h2 className="text-center mt-10 text-gray-600">
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </main>

      {/* Global Footer visible on all pages */}
      <Footer />
    </Router>
  );
};

export default AppRoute;


