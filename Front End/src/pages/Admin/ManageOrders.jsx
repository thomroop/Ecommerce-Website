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

  // ✅ Prevent duplicate toast messages
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

      // ✅ Show success toast only once
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart size={28} className="text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
          <p className="text-gray-600 text-sm">
            Track, view, and update customer orders.
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Search + Filter */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg w-full sm:w-1/3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={handleSearch}
              className="outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-2 border px-3 py-2 rounded-lg">
            <Filter size={18} className="text-gray-500" />
            <select
              value={statusFilter}
              onChange={handleFilter}
              className="outline-none text-sm bg-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No matching orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-100">
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
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">
                      {order.customer?.name || "Unknown"}
                    </td>
                    <td className="px-4 py-2">₹{order.totalPrice}</td>
                    <td className="px-4 py-2 capitalize">{order.status}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
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

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-xl shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Order Details
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              <strong>Customer:</strong> {selectedOrder.customer?.name} (
              {selectedOrder.customer?.email})
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Total:</strong> ₹{selectedOrder.totalPrice}
            </p>
            <p className="text-sm text-gray-600 mb-2 capitalize">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>

            {/* Ordered Items */}
            <div className="border-t pt-3">
              <h4 className="font-semibold mb-2">Items:</h4>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {selectedOrder.orderItems?.map((item) => (
                  <li key={item._id}>
                    Product ID: {item.product} × {item.quantity} — ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center"
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




