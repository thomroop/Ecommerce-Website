// @desc    DashboardCards Component - Displays summary cards for key admin statistics like products, orders, users, and revenue
// @route   Frontend Admin Component
// @access  Private (Admin only)

import React from "react";

const DashboardCards = () => {
  const stats = [
    { title: "Total Products", value: 40 },
    { title: "Total Orders", value: 120 },
    { title: "Total Users", value: 85 },
    { title: "Revenue", value: "₹2,40,000" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-lg font-semibold text-slate-700">
            {item.title}
          </h2>
          <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-slate-600 bg-clip-text text-transparent mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
