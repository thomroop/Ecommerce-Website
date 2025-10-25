// @desc    AdminLayout Component - Defines layout for all admin pages with sidebar and dynamic main content
// @route   Frontend Layout Component
// @access  Private (Admin only)

// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar stays constant */}
      <DashboardSidebar />

      {/* Main area shows the active admin route */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;


