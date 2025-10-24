import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Orders Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#facc15" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
