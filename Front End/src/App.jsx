// @desc    Main Application Routes - Handles User, Admin, and Payment routes with layouts and protection
// @route   Frontend Application Entry
// @access  Public + Private (User/Admin)

import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// ✅ Layout Components
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminLayout from "./pages/Admin/AdminLayout";

// ✅ USER PAGES
import ProductList from "./pages/product/ProductList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CartPage from "./pages/cart/CartPage";

// ✅ PAYMENT PAGES
import CheckoutPage from "./pages/payment/CheckoutPage";
import PaymentSuccess from "./pages/payment/PaymentSuccess";

// ✅ ADMIN PAGES
import DashboardHome from "./pages/Admin/Dashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageOrders from "./pages/Admin/ManageOrders";
import ManageUsers from "./pages/Admin/ManageUsers";

// ✅ Layout for all user-facing pages
const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-600">Loading...</div>}>
      <Routes>
        {/* =======================
              ✅ USER ROUTES
           ======================= */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<ProductList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* =======================
              ✅ PAYMENT ROUTES (Protected for logged-in users)
           ======================= */}
        <Route element={<ProtectedRoute requiredRole="User" />}>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* =======================
              ✅ ADMIN ROUTES (Protected)
           ======================= */}
        <Route element={<ProtectedRoute requiredRole="Admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Route>

        {/* =======================
              ❌ 404 REDIRECT
           ======================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
