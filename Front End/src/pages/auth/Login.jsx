// @desc    Login Page - Authenticates users, displays role-based navigation, and provides toast notifications on success or failure
// @route   Frontend Public Page
// @access  Public

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail, validatePassword } from "../../utils/validation";
import PageWrapper from "../../components/common/PageWrapper";
import SupportLink from "../../components/common/SupportLink";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Email validation
    if (!formData.email || !validateEmail(formData.email)) {
      toast.error("Please enter a valid email address ❌", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }

    // ✅ Password validation
    if (!formData.password || !validatePassword(formData.password)) {
      toast.error("Password must be at least 6 characters ❌", {
        position: "top-center",
        autoClose: 2000,
      });
      setLoading(false);
      return;
    }

    // ✅ Try login
    try {
      const userData = await login(formData);

      toast.success(`Welcome back, ${userData.name || "User"}! 🎉`, {
        position: "top-center",
        autoClose: 2000,
      });

      // ✅ Role-based navigation
      if (userData.role?.toLowerCase() === "admin") navigate("/admin");
      else navigate("/");

    } catch (err) {
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

  // ✅ Render UI
  return (
    <PageWrapper>
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-96 p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-teal-600 to-slate-600 text-white py-2 rounded-lg font-semibold shadow-md hover:from-teal-700 hover:to-slate-700 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔗 Forgot + Register links */}
        <div className="text-center mt-4 flex justify-center gap-4 text-sm">
          <Link
            to="/forgot-password"
            className="text-teal-600 hover:underline font-medium"
          >
            Forgot Password?
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            to="/register"
            className="text-teal-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>

        {/* 💬 Support link */}
        <div className="mt-4">
          <SupportLink message="Facing issues with your account?" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;










