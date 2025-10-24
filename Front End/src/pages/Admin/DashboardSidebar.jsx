import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: Home, link: "/admin" },
    {
      name: "Products",
      icon: Package,
      link: "/admin/products",
      hasSubmenu: true,
      submenu: [
        // ✅ Fixed: Only keep the correct working link
        { name: "Manage Products", link: "/admin/products" },
      ],
    },
    { name: "Orders", icon: ShoppingCart, link: "/admin/orders" },
    { name: "Users", icon: Users, link: "/admin/users" },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.link ||
            (item.submenu &&
              item.submenu.some((sub) => sub.link === location.pathname));

          // ✅ For items with submenu
          if (item.hasSubmenu) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => setOpenSubmenu((prev) => !prev)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-yellow-500 text-black font-semibold"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {openSubmenu ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {openSubmenu && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.link}
                        className={`block px-3 py-2 text-sm rounded-md transition-all ${
                          location.pathname === sub.link
                            ? "bg-yellow-400 text-black font-medium"
                            : "hover:bg-gray-800"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // ✅ For normal items (no submenu)
          return (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-800"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;


