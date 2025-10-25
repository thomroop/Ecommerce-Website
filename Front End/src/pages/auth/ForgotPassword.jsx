// @desc    ForgotPassword Page - Allows users to request a password reset by sending an OTP to their registered email
// @route   Frontend Public Page
// @access  Public

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Import toast

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Use .env variable for consistent API base
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}forgot-password`,
        { email }
      );

      // ✅ Success toast
      toast.success(res.data.message || "OTP sent to your registered email. 📧", {
        position: "top-center",
        autoClose: 3000,
      });

      // Optional: clear the input
      setEmail("");
    } catch (err) {
      // ✅ Error toast
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`text-white py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;


