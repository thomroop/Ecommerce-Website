// @desc    Dashboard Page - Displays admin overview with real-time stats for products, orders, and users
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
// Example in .env: VITE_API_BASE_URL="https://ecommerce-website-1-h99k.onrender.com/api"

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  // Helper to extract count from various response shapes
  const extractCount = (res) => {
    if (!res) return 0;
    const d = res.data;
    if (Array.isArray(d)) return d.length;
    if (Array.isArray(d?.data)) return d.data.length;
    if (typeof d?.length === "number") return d.length;
    if (typeof res.length === "number") return res.length;
    return 0;
  };

  // ✅ Fetch statistics from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const authToken = token || localStorage.getItem("token");

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/products`),
          axios.get(`${API_BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${API_BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        setStats({
          products: extractCount(productsRes),
          orders: extractCount(ordersRes),
          users: extractCount(usersRes),
        });
      } catch (error) {
        console.error("❌ Error fetching dashboard stats:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-600 text-lg">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* ✅ Dashboard Header */}
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard size={28} className="text-teal-600" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome,{" "}
            <span className="text-teal-700">{user?.name || "Admin"}</span> 🤝
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Here’s a quick overview of your store activity.
          </p>
        </div>
      </div>

      {/* ✅ Dashboard Summary Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition">
          <div className="flex items-center gap-3 mb-2">
            <Package className="text-teal-600" size={22} />
            <h2 className="font-semibold text-slate-700">Total Products</h2>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.products}</p>
          <p className="text-sm text-slate-500 mt-1">Active in catalog</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-slate-600" size={22} />
            <h2 className="font-semibold text-slate-700">Total Orders</h2>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.orders}</p>
          <p className="text-sm text-slate-500 mt-1">Orders placed</p>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-teal-700" size={22} />
            <h2 className="font-semibold text-slate-700">Total Users</h2>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.users}</p>
          <p className="text-sm text-slate-500 mt-1">Registered customers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


