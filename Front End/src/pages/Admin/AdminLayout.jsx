// @desc    AdminLayout Component - Defines layout for all admin pages with navbar, sidebar, and main content
// @route   Frontend Layout Component
// @access  Private (Admin only)

import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import AdminNavbar from "../../components/layout/AdminNavbar"; // ✅ Import your Admin Navbar
import Footer from "../../components/layout/Footer"; // Optional footer

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* ✅ Admin Navbar at the top */}
      <AdminNavbar />

      <div className="flex flex-grow">
        {/* ✅ Sidebar (visible on medium+ screens) */}
        <aside className="w-64 bg-gradient-to-b from-teal-700 to-slate-700 text-white shadow-xl hidden sm:block">
          <DashboardSidebar />
        </aside>

        {/* ✅ Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-tl-2xl border-l border-gray-200">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ✅ Optional Footer for Admin */}
      <Footer />
    </div>
  );
};

export default AdminLayout;


