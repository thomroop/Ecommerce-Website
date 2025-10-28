// @desc    ManageOrders Page - Allows admin to view, search, filter, and update customer orders in real time
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, Search, Filter, Eye } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const toastShown = useRef(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data);
      setFilteredOrders(res.data.data);

      if (!toastShown.current) {
        toast.success("Orders loaded successfully ✅");
        toastShown.current = true;
      }
    } catch (error) {
      toast.error("Failed to load orders ❌");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterOrders(term, statusFilter);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterOrders(searchTerm, value);
  };

  const filterOrders = (term, status) => {
    let filtered = orders;

    if (term) {
      filtered = filtered.filter((order) =>
        order.customer?.name?.toLowerCase().includes(term)
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === status
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/orders/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      filterOrders(searchTerm, statusFilter);

      toast.success(`Order status updated to ${newStatus} ✅`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update order status ❌");
    }
  };

  return (
    <div className="p-4">
      {/* ✅ Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart size={28} className="text-teal-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Orders</h2>
          <p className="text-slate-600 text-sm">
            Track, view, and update customer orders.
          </p>
        </div>
      </div>

      {/* ✅ Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
        {/* ✅ Search + Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg w-full sm:w-1/3 focus-within:ring-2 focus-within:ring-teal-500">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={handleSearch}
              className="outline-none w-full text-sm text-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
            <Filter size={18} className="text-slate-500" />
            <select
              value={statusFilter}
              onChange={handleFilter}
              className="outline-none text-sm bg-transparent text-slate-700"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-slate-500">
            No matching orders found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-teal-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-slate-700">{order._id}</td>
                    <td className="px-4 py-2 text-slate-700">
                      {order.customer?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      ₹{order.totalPrice}
                    </td>
                    <td className="px-4 py-2 capitalize text-slate-700">
                      {order.status}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-300 px-2 py-1 rounded text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-gradient-to-r from-teal-600 to-slate-600 text-white px-3 py-1 rounded hover:from-teal-700 hover:to-slate-700 flex items-center gap-1 transition-all duration-200"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-xl shadow-lg relative border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">
              Order Details
            </h3>

            <p className="text-sm text-slate-600 mb-2">
              <strong>Customer:</strong> {selectedOrder.customer?.name} (
              {selectedOrder.customer?.email})
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Total:</strong> ₹{selectedOrder.totalPrice}
            </p>
            <p className="text-sm text-slate-600 mb-2 capitalize">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            <div className="border-t pt-3">
              <h4 className="font-semibold mb-2 text-slate-700">Items:</h4>
              <ul className="list-disc pl-5 text-slate-700 text-sm">
                {selectedOrder.orderItems?.map((item) => (
                  <li key={item._id}>
                    Product ID: {item.product} × {item.quantity} — ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full w-7 h-7 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;




