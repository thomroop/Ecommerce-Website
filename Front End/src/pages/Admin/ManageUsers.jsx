// @desc    ManageUsers Page - Allows admin to view, search, and delete registered users with role-based access
// @route   Frontend Admin Page
// @access  Private (Admin only)

import React, { useEffect, useState, useRef } from "react";
import { Users, Search, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
// .env example: VITE_API_BASE_URL="https://your-backend.onrender.com/api"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const toastShown = useRef(false);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // support res.data.data OR res.data (array)
      const data = res.data?.data ?? res.data ?? [];
      setUsers(Array.isArray(data) ? data : []);
      setFilteredUsers(Array.isArray(data) ? data : []);

      if (!toastShown.current) {
        toast.success("Users loaded successfully ✅");
        toastShown.current = true;
      }
    } catch (error) {
      toast.error("Failed to fetch users ❌");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = (e.target.value ?? "").toString().toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((u) => {
      const name = (u?.name ?? "").toString().toLowerCase();
      const email = (u?.email ?? "").toString().toLowerCase();
      return name.includes(term) || email.includes(term);
    });

    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    const userToDelete = users.find((u) => u._id === id);
    if (!userToDelete) {
      toast.error("User not found ❌");
      return;
    }

    // Role-based protection: prevent deleting admin users from UI
    if ((userToDelete.role ?? "").toString().toLowerCase() === "admin") {
      toast.error("Cannot delete admin user ❌");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers = users.filter((u) => u._id !== id);
      setUsers(updatedUsers);
      // keep current search filtering applied
      setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully 🗑️");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user ❌");
    }
  };

  const capitalize = (s) =>
    s && s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  return (
    <div className="p-4">
      {/* ✅ Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users size={28} className="text-teal-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Users</h2>
          <p className="text-slate-600 text-sm">
            View and manage all registered users and admins.
          </p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
        {/* ✅ Search Bar */}
        <div className="flex items-center gap-2 mb-4 border border-gray-200 px-3 py-2 rounded-lg w-full sm:w-1/3 focus-within:ring-2 focus-within:ring-teal-500">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="outline-none w-full text-sm text-slate-700"
          />
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-slate-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-teal-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-slate-700">
                      {user.name ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 text-slate-700">
                      {user.email ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 capitalize text-slate-700">
                      {capitalize((user.role ?? "user").toString())}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-gradient-to-r from-teal-600 to-slate-600 text-white px-3 py-1 rounded hover:from-teal-700 hover:to-slate-700 flex items-center gap-1 transition-all duration-200"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded hover:from-red-600 hover:to-rose-700 flex items-center gap-1 transition-all duration-200"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Modal for User Details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-xl shadow-lg relative border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">
              User Details
            </h3>

            <p className="text-sm text-slate-600 mb-2">
              <strong>Name:</strong> {selectedUser.name ?? "N/A"}
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Email:</strong> {selectedUser.email ?? "N/A"}
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Phone:</strong> {selectedUser.phone ?? "N/A"}
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Address:</strong>{" "}
              {(selectedUser.address ?? []).length
                ? (selectedUser.address ?? []).join(", ")
                : "N/A"}
            </p>
            <p className="text-sm text-slate-600 mb-2 capitalize">
              <strong>Role:</strong> {capitalize(selectedUser.role ?? "user")}
            </p>
            <p className="text-sm text-slate-600 mb-2 capitalize">
              <strong>Status:</strong> {capitalize(selectedUser.status ?? "active")}
            </p>
            <p className="text-sm text-slate-600 mb-4">
              <strong>Joined:</strong>{" "}
              {selectedUser.createdAt
                ? new Date(selectedUser.createdAt).toLocaleString()
                : "N/A"}
            </p>

            <button
              onClick={() => setSelectedUser(null)}
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

export default ManageUsers;


