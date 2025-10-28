// @desc    PageWrapper Component - Reusable gradient background wrapper
// @route   Frontend Common Component
// @access  Public

import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-gray-100 to-slate-300 flex justify-center items-center py-16 px-6">
      {children}
    </div>
  );
};

export default PageWrapper;
