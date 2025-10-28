// @desc    Register Page - Handles new user registration with validation and redirects to login upon success
// @route   Frontend Public Page
// @access  Public

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword, validatePhone } from "../../utils/validation";
import PageWrapper from "../../components/common/PageWrapper";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission with safe validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Basic name check
    if (!formData.name.trim()) {
      setError("Please enter your full name ❌");
      return;
    }

    // ✅ Email validation
    if (!formData.email || !validateEmail(formData.email)) {
      setError("Please enter a valid email address ❌");
      return;
    }

    // ✅ Password validation
    if (!formData.password || !validatePassword(formData.password)) {
      setError("Password must be at least 6 characters ❌");
      return;
    }

    // ✅ Phone validation (safe check)
    if (!formData.phone || !validatePhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number ❌");
      return;
    }

    try {
      await register(formData);
      setSuccess("🎉 Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-96 p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
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
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
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
            className="bg-gradient-to-r from-teal-600 to-slate-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-slate-700 transition-all font-semibold shadow-md"
            type="submit"
          >
            Register
          </button>
        </form>

        {/* ✅ Modern error/success messages */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {success && <p className="text-teal-600 mt-3 text-center">{success}</p>}

        {/* 🔗 Back to login */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
};

export default Register;

