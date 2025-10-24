import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUserAdd, // ✅ Import Register icon
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

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="text-xl font-bold select-none">UrbanBasket</div>
          <button
            className="sm:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineMenu />
          </button>
        </div>

        {/* Links */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full sm:w-auto ${
            isOpen ? "block" : "hidden"
          } sm:flex mt-2 sm:mt-0`}
        >
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-red-400 font-semibold flex items-center gap-1"
                : "hover:text-yellow-300 transition flex items-center gap-1"
            }
          >
            <AiFillHome /> Home
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-red-400 font-semibold flex items-center gap-1"
                : "hover:text-yellow-300 transition flex items-center gap-1"
            }
          >
            <AiOutlineShoppingCart /> Cart
          </NavLink>

          {/* Admin Panel */}
          {isAuthenticated && user?.role === "Admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-400 font-semibold flex items-center gap-1"
                  : "hover:text-yellow-300 transition flex items-center gap-1"
              }
            >
              <MdAdminPanelSettings /> Admin
            </NavLink>
          )}

          {/* Login/Register or Logout */}
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-400 font-semibold flex items-center gap-1"
                    : "hover:text-yellow-300 transition flex items-center gap-1"
                }
              >
                <AiOutlineLogin /> Login
              </NavLink>

              {/* ✅ Register Icon added here */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-400 font-semibold flex items-center gap-1"
                    : "hover:text-yellow-300 transition flex items-center gap-1"
                }
              >
                <AiOutlineUserAdd /> Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition font-semibold flex items-center gap-1"
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
