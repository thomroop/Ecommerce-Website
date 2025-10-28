// @desc    Privacy Policy Component - Displays website privacy and data protection info
// @route   Frontend Common Component
// @access  Public

import React from "react";

const PrivacyPolicy = () => {
  return (
    // 🌿 OUTER DIV — darker gradient, more visible contrast
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-gray-100 to-slate-300 flex justify-center items-center py-16 px-6">
      {/* 🌸 INNER CARD — soft white with slight transparency */}
      <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-10 max-w-3xl w-full text-gray-700 leading-relaxed">
        <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At <span className="font-semibold text-teal-700">UrbanBasket</span>,
          we value your privacy and are committed to protecting your personal
          information. This policy explains how we collect, use, and safeguard
          your data when you interact with our website.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          1️⃣ Information We Collect
        </h2>
        <p>
          We may collect details such as your name, email, contact number, and
          delivery address when you make a purchase or contact support.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          2️⃣ How We Use Your Data
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To process orders and provide delivery updates</li>
          <li>To improve our products and website experience</li>
          <li>To send promotional updates (only with your consent)</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          3️⃣ Data Security
        </h2>
        <p>
          We use secure payment gateways and encrypted technologies to ensure
          your personal and payment information remains safe.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          4️⃣ Third-Party Sharing
        </h2>
        <p>
          We do not sell or share your data with third parties, except for
          trusted partners who help deliver your order (e.g., courier or payment
          providers).
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          5️⃣ Your Rights
        </h2>
        <p>
          You can request access, correction, or deletion of your personal data
          anytime by contacting our support team.
        </p>

        <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-2">
          6️⃣ Contact Us
        </h2>
        <p>
          If you have any questions about this privacy policy, please contact us
          via our{" "}
          <a
            href="/contact"
            className="text-teal-600 font-medium hover:underline"
          >
            Contact Support
          </a>{" "}
          page.
        </p>

        <p className="mt-8 text-center text-sm text-gray-500">
          Last updated on: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
