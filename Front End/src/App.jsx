import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CheckoutPage from "./pages/payment/CheckoutPage";
import PaymentSuccess from "./pages/payment/PaymentSuccess";


// ✅ USER PAGES
import ProductList from "./pages/product/ProductList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CartPage from "./pages/cart/CartPage";

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
    <Routes>
      {/* ✅ USER ROUTES */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<ProductList />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      <Route path="checkout" element={<CheckoutPage />} /> 
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* ✅ ADMIN ROUTES (Protected) */}
      <Route element={<ProtectedRoute requiredRole="Admin" />}>
        <Route path="/admin">
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>

      {/* ✅ 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
