// @desc    SupportLink Component - Displays a helpful link to contact support for users
// @route   Frontend Common Component
// @access  Public

import React from "react";
import { Link } from "react-router-dom";
import { LifeBuoy } from "lucide-react";

const SupportLink = ({ message = "Need help? Contact Support" }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-gray-700 text-sm flex flex-col sm:flex-row justify-center items-center gap-1">
        {message}
        <Link
          to="/contact" // ✅ Redirects to your ContactPage route
          className="text-teal-600 font-semibold hover:underline flex items-center gap-1 transition-all"
        >
          <LifeBuoy size={16} /> Contact Support
        </Link>
      </p>
    </div>
  );
};

export default SupportLink;

