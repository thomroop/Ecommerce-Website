import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineAppstore,
} from "react-icons/ai";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-3 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-16" : "w-56"
      } sm:relative sm:translate-x-0`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 text-xl hover:text-yellow-400"
      >
        <AiOutlineMenu />
      </button>

      {/* Logo */}
      {!collapsed && (
        <h1 className="text-xl font-bold text-center mb-6 text-yellow-400">
          UrbanBasket
        </h1>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded transition-all duration-200 ${
              isActive
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <AiFillHome size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded transition-all duration-200 ${
              isActive
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <AiOutlineAppstore size={20} />
          {!collapsed && <span>Products</span>}
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded transition-all duration-200 ${
              isActive
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <AiOutlineShoppingCart size={20} />
          {!collapsed && <span>Orders</span>}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded transition-all duration-200 ${
              isActive
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-gray-700"
            }`
          }
        >
          <AiOutlineUser size={20} />
          {!collapsed && <span>Users</span>}
        </NavLink>
      </nav>

      {/* Footer (Optional) */}
      {!collapsed && (
        <div className="mt-auto text-center text-xs text-gray-400 border-t border-gray-700 pt-3">
          © {new Date().getFullYear()} UrbanBasket
        </div>
      )}
    </div>
  );
};

export default Sidebar;
