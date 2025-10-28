// @desc    CategoryFilter Component - Displays product categories and handles category-based filtering
// @route   Frontend Component
// @access  Public

import React from "react";

const categories = [
  "All",
  "AirPods",
  "Camera",
  "Earphones",
  "Mobiles",
  "Printers",
  "Processors",
  "TVs",
  "Watches",
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center mb-6">
      {/* ✅ Matches ProductList filter bar style */}
      <div className="flex flex-wrap justify-center gap-3 bg-white p-3 rounded-full shadow-md border border-gray-100 max-w-5xl w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-teal-600 to-slate-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;






