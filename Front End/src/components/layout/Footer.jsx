// @desc    Footer Component - Displays support link, quick links, social icons, privacy note, and credits
// @route   Frontend Component
// @access  Public

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";




const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-slate-700 text-white py-8 mt-10 shadow-inner">
      <div className="container mx-auto px-4 text-center space-y-4">
        {/* 💬 Contact Support Link */}
        <p className="text-sm">
          Need help with your order?{" "}
          <Link
            to="/contact"
            className="text-yellow-300 hover:text-yellow-400 font-medium transition-all"
          >
            Contact Support
          </Link>
        </p>

        {/* 🔗 Quick Links */}
        <div className="flex justify-center gap-5 text-xs text-gray-300">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>
          <Link to="/login" className="hover:text-yellow-300 transition">
            Login
          </Link>
        </div>

        {/* 🌐 Social Icons */}
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-transform transform hover:scale-110"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-transform transform hover:scale-110"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-transform transform hover:scale-110"
          >
            <Linkedin size={20} />
          </a>
        </div>



        {/* 📜 Privacy Policy Note */}
        <p className="text-xs text-gray-200 mt-4">
          We respect your privacy.{" "}
          <Link
            to="/privacy"
            className="text-yellow-300 hover:text-yellow-400 font-medium"
          >
            Read our Privacy Policy
          </Link>
          .
        </p>

        {/* 👩‍💻 Copyright + Credit */}
        <div className="space-y-1 mt-3">
          <p className="text-xs text-gray-200">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-yellow-300">UrbanBasket</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Designed & Developed by{" "}
            <span className="text-yellow-300">Roopa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





