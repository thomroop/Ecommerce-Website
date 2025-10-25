// @desc    MiniLayout Component - Defines a two-column layout with a sidebar and main content area
// @route   Frontend Layout Component
// @access  Private (used for admin or protected sections)

import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MiniLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MiniLayout;


