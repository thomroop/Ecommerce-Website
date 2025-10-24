// src/components/CategoryFilter.jsx
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
    <div className="flex justify-center mb-4">
      <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-full shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-yellow-200"
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

