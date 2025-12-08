// @desc    Navbar Component - Displays responsive navigation with role-based links and authentication handling
// @route   Frontend Component
// @access  Public (links vary based on user authentication and role)

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAuthenticated = !!user;

  // ✅ Safely normalize role and detect admin
  const userRole =
    typeof user?.role === "string" ? user.role.toLowerCase() : "";
  const isAdmin = isAuthenticated && userRole === "admin";

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-slate-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* ✅ Logo + Hamburger */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div
            className="text-2xl font-bold select-none tracking-wide cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-white">Urban</span>
            <span className="text-yellow-300">Basket</span>
          </div>

          <button
            className="sm:hidden text-2xl hover:text-yellow-300 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
        </div>

        {/* ✅ Links Section */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full sm:w-auto ${
            isOpen ? "block" : "hidden"
          } sm:flex mt-2 sm:mt-0`}
        >
          {/* 🏠 Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <AiFillHome /> Home
          </NavLink>

          {/* 🛒 Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium transition-all ${
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300"
                  : "hover:text-yellow-300"
              }`
            }
          >
            <AiOutlineShoppingCart /> Cart
          </NavLink>

          {/* ⚙️ Admin Panel (only for admins) */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1 font-medium transition-all ${
                  isActive
                    ? "text-yellow-300 border-b-2 border-yellow-300"
                    : "hover:text-yellow-300"
                }`
              }
            >
              <MdAdminPanelSettings /> Admin
            </NavLink>
          )}

          {/* 🔑 Authentication Links */}
          {!isAuthenticated ? (
            <>
              {/* ✅ Login */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center gap-1 font-medium transition-all ${
                    isActive
                      ? "text-yellow-300 border-b-2 border-yellow-300"
                      : "hover:text-yellow-300"
                  }`
                }
              >
                <AiOutlineLogin /> Login
              </NavLink>
            </>
          ) : (
            /* 🚪 Logout Button */
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 font-medium hover:text-yellow-300 transition-all"
            >
              <AiOutlineLogout /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
