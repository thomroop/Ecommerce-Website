// @desc    Dashboard Page - Displays admin overview with real-time stats for products, orders, and users
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch statistics from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use fallback token if context isn't ready yet
        const authToken = token || localStorage.getItem("token");

        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/orders", {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get("http://localhost:8080/api/users", {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        // ✅ Match your backend structure — all APIs return { success, message, data: [...] }
        setStats({
          products: productsRes.data?.data?.length || 0,
          orders: ordersRes.data?.data?.length || 0,
          users: usersRes.data?.data?.length || 0,
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
      <div className="p-6 text-center text-gray-600 text-lg">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* ✅ Dashboard Header */}
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard size={28} className="text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-yellow-600">{user?.name || "Admin"}</span> 👋
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Here’s a quick overview of your store activity.
          </p>
        </div>
      </div>

      {/* ✅ Dashboard Summary Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <Package className="text-green-600" size={22} />
            <h2 className="font-semibold text-gray-700">Total Products</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
          <p className="text-sm text-gray-500 mt-1">Active in catalog</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-blue-600" size={22} />
            <h2 className="font-semibold text-gray-700">Total Orders</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.orders}</p>
          <p className="text-sm text-gray-500 mt-1">Orders placed</p>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-600" size={22} />
            <h2 className="font-semibold text-gray-700">Total Users</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
          <p className="text-sm text-gray-500 mt-1">Registered customers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

