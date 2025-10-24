import React, { useEffect, useState, useRef } from "react";
import { Users, Search, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Add this ref to prevent duplicate toast on React Strict Mode double render
  const toastShown = useRef(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);

      // ✅ Show toast only once
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
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers = users.filter((u) => u._id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      toast.success("User deleted successfully 🗑️");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user ❌");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users size={28} className="text-yellow-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          <p className="text-gray-600 text-sm">
            View and manage all registered users and admins.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4 border px-3 py-2 rounded-lg w-full sm:w-1/3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="outline-none w-full text-sm"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-100">
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
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
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

      {/* Modal for User Details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-xl shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              User Details
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Phone:</strong> {selectedUser.phone || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Address:</strong>{" "}
              {selectedUser.address?.length
                ? selectedUser.address.join(", ")
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2 capitalize">
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p className="text-sm text-gray-600 mb-2 capitalize">
              <strong>Status:</strong> {selectedUser.status || "Active"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Joined:</strong>{" "}
              {selectedUser.createdAt
                ? new Date(selectedUser.createdAt).toLocaleString()
                : "N/A"}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedUser(null)}
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

export default ManageUsers;


