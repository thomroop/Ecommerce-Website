// @desc    DashboardChart Component - Displays weekly order trends using a responsive line chart
// @route   Frontend Admin Component
// @access  Private (Admin only)

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = () => {
  const data = [
    { name: "Mon", orders: 30 },
    { name: "Tue", orders: 50 },
    { name: "Wed", orders: 40 },
    { name: "Thu", orders: 80 },
    { name: "Fri", orders: 70 },
    { name: "Sat", orders: 90 },
    { name: "Sun", orders: 60 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4 text-slate-700">
        Weekly Orders Overview
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #94a3b8",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#0f172a" }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="url(#colorTealGradient)"
            strokeWidth={3}
            dot={{ fill: "#0f766e", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#0f766e" }}
          />
          {/* ✅ Add teal–slate gradient for line */}
          <defs>
            <linearGradient id="colorTealGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;


