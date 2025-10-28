// @desc    Admin Navbar - Displays responsive navigation for admin dashboard with sidebar toggle
// @route   Frontend Layout Component
// @access  Private (Admin only)

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineDashboard,
  AiOutlineHome, // 🏠 Import Home icon
} from "react-icons/ai";
import { MdInventory2, MdShoppingBag, MdPeople } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-teal-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* ✅ Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* 🟢 Hamburger (visible only on mobile) */}
          <button
            className="sm:hidden text-2xl hover:text-yellow-300 transition"
            onClick={toggleSidebar}
          >
            <AiOutlineMenu />
          </button>

          {/* 🏷️ Logo */}
          <div
            className="text-2xl font-bold select-none tracking-wide cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <span className="text-yellow-300">Admin</span>
            <span className="text-white">Panel</span>
          </div>
        </div>

        {/* ✅ Links Section (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {/* 🏠 Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <AiOutlineHome /> Home
          </NavLink>

          {/* 📊 Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <AiOutlineDashboard /> Dashboard
          </NavLink>

          {/* 📦 Products */}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <MdInventory2 /> Products
          </NavLink>

          {/* 🛒 Orders */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <MdShoppingBag /> Orders
          </NavLink>

          {/* 👥 Users */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-1 transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <MdPeople /> Users
          </NavLink>

          {/* 🚪 Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-yellow-300 transition-all"
          >
            <AiOutlineLogout /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

