// @desc    ForgotPassword Page - Allows users to request a password reset by sending an OTP to their registered email
// @route   Frontend Public Page
// @access  Public

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageWrapper from "../../components/common/PageWrapper"; // ✅ Added for gradient background
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        { email }
      );

      toast.success(res.data.message || "OTP sent to your registered email. 📧", {
        position: "top-center",
        autoClose: 3000,
      });

      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Error sending OTP. Please try again. ❌",
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
    <PageWrapper>
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl w-96 p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Forgot Password 🔑
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-teal-600 to-slate-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all hover:from-teal-700 hover:to-slate-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        {/* 🔗 Back to Login link */}
        <div className="text-center mt-4 text-sm">
          <Link
            to="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ForgotPassword;




