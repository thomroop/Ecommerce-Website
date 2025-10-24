import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react"; // ✅ added icons

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-4">
      {/* ✅ Dashboard Header */}
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard size={28} className="text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-yellow-600">{user?.name || "Admin"}</span> 👋
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
          <p className="text-3xl font-bold text-gray-900">40</p>
          <p className="text-sm text-gray-500 mt-1">Active in catalog</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-blue-600" size={22} />
            <h2 className="font-semibold text-gray-700">Total Orders</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">25</p>
          <p className="text-sm text-gray-500 mt-1">Orders placed</p>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-600" size={22} />
            <h2 className="font-semibold text-gray-700">Total Users</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">10</p>
          <p className="text-sm text-gray-500 mt-1">Registered customers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
