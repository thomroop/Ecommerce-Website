// @desc    Register Page - Handles new user registration with validation and redirects to login upon success
// @route   Frontend Public Page
// @access  Public

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validation"; // ✅ Import validation functions

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Use imported validation functions
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      setError("Please enter a valid 10-digit phone number");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-xl rounded-2xl w-96 border border-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-center text-teal-700">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            required
          />

          {/* ✅ Updated button colors */}
          <button
            className="bg-gradient-to-r from-teal-600 to-slate-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-slate-700 transition-all font-semibold shadow-md"
            type="submit"
          >
            Register
          </button>
        </form>

        {/* ✅ Modern error/success colors */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {success && <p className="text-teal-600 mt-3 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
