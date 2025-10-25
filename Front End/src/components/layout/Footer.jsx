// @desc    Footer Component - Displays website footer with copyright information
// @route   Frontend Component
// @access  Public

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

