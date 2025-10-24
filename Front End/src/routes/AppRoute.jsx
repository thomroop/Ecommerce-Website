import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Public Pages
import ProductList from "../pages/product/ProductList";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import CartPage from "../pages/cart/CartPage";

// Admin Pages
import AdminPage from "../pages/auth/AdminPage"; // ✅ Contains nested admin routes
import ProtectedRoute from "./ProtectedRoutes"; // Route protection

const AppRoute = () => {
  return (
    <Router>
      <Navbar />

      <main className="min-h-[80vh] container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:category?" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartPage />} />

          {/* ✅ Protected Admin Routes */}
          <Route element={<ProtectedRoute requiredRole="Admin" />}>
            <Route path="/admin/*" element={<AdminPage />} /> 
            {/* The * means all subroutes (dashboard, products, users, etc.) 
                will be handled inside AdminPage.jsx */}
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <h2 className="text-center mt-10 text-gray-600">
                404 Page Not Found
              </h2>
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default AppRoute;

