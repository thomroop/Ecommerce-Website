// @desc    Login Page - Authenticates users, displays role-based navigation, and provides toast notifications on success or failure
// @route   Frontend Public Page
// @access  Public

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { validateEmail, validatePassword } from "../../utils/validation"; // ✅ imported utils

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Validation before sending request
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address ❌", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 6 characters ❌", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }

    try {
      const userData = await login(formData);

      // ✅ Success toast
      toast.success(`Welcome back, ${userData.name || "User"}! 🎉`, {
        position: "top-center",
        autoClose: 2000,
      });

      // ✅ Role-based redirect
      if (userData.role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);

      toast.error(
        err.response?.data?.message || "Invalid email or password ❌",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ✅ Forgot Password link */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;





