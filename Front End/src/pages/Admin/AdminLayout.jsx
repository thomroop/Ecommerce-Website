// src/pages/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

/**
 * AdminLayout.jsx
 * Layout for all admin pages.
 * Contains:
 * - Sidebar (left)
 * - Main area (renders current admin page using <Outlet />)
 */

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar stays constant */}
      <DashboardSidebar />

      {/* Main area shows whatever admin route is active */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

