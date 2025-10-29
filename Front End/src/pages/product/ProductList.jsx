// @desc    ProductList Page - Displays all available products with category filters and add-to-cart functionality
// @route   Frontend Product Page
// @access  Public

import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cartcontext";
import BannerCarousel from "../../components/layout/BannerCarousel";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const BASE_URL = "https://ecommerce-website-1-h99k.onrender.com";

  // ✅ Full Product List (restored 40+ items)
  const products = [
    // AirPods
    { id: 1, name: "AirPods Pro", category: "AirPods", price: 500, image: `${BASE_URL}/uploads/airpods/images-1760281187698.webp` },
    { id: 2, name: "AirPods 3rd Gen", category: "AirPods", price: 1000, image: `${BASE_URL}/uploads/airpods/images-1760283908533.webp` },
    { id: 3, name: "AirPods Max", category: "AirPods", price: 1200, image: `${BASE_URL}/uploads/airpods/images-1760283908537.webp` },
    { id: 4, name: "AirPods Pro 2", category: "AirPods", price: 500, image: `${BASE_URL}/uploads/airpods/images-1760283908539.webp` },
    { id: 5, name: "AirPods 2nd Gen", category: "AirPods", price: 460, image: `${BASE_URL}/uploads/airpods/images-1760284241875.webp` },

    // Cameras
    { id: 6, name: "Canon EOS R5", category: "Camera", price: 150000, image: `${BASE_URL}/uploads/cameras/images-1760284241876.jpg` },
    { id: 7, name: "Sony Alpha 7 IV", category: "Camera", price: 9900, image: `${BASE_URL}/uploads/cameras/images-1760284241877.jpg` },
    { id: 8, name: "Nikon Z6 II", category: "Camera", price: 19980, image: `${BASE_URL}/uploads/cameras/images-1760284268943.jpg` },
    { id: 9, name: "Canon EOS R6", category: "Camera", price: 155555, image: `${BASE_URL}/uploads/cameras/images-1760284268944.jpg` },
    { id: 10, name: "Sony Alpha 1", category: "Camera", price: 196499, image: `${BASE_URL}/uploads/cameras/images-1760284241876.jpg` },

    // Earphones
    { id: 11, name: "Bose QuietComfort Earbuds", category: "Earphones", price: 750, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 12, name: "Sony WF-1000XM4", category: "Earphones", price: 640, image: `${BASE_URL}/uploads/earphones/images-1760284197214.webp` },
    { id: 13, name: "JBL Live 300TWS", category: "Earphones", price: 863, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 14, name: "Apple EarPods", category: "Earphones", price: 2900, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 15, name: "Samsung Galaxy Buds 2", category: "Earphones", price: 1299, image: `${BASE_URL}/uploads/earphones/images-1760284197214.webp` },

    // Mobiles
    { id: 16, name: "iPhone 15 Pro", category: "Mobiles", price: 195000, image: `${BASE_URL}/uploads/mobiles/images-1760284332734.webp` },
    { id: 17, name: "Samsung Galaxy S23", category: "Mobiles", price: 100000, image: `${BASE_URL}/uploads/mobiles/images-1760284332735.webp` },
    { id: 18, name: "Google Pixel 8", category: "Mobiles", price: 99000, image: `${BASE_URL}/uploads/mobiles/images-1760284332739.webp` },
    { id: 19, name: "OnePlus 12", category: "Mobiles", price: 290500, image: `${BASE_URL}/uploads/mobiles/images-1760284332735.webp` },
    { id: 20, name: "Xiaomi 14 Pro", category: "Mobiles", price: 69980, image: `${BASE_URL}/uploads/mobiles/images-1760284332739.webp` },

    // Printers
    { id: 21, name: "HP LaserJet Pro", category: "Printers", price: 29950, image: `${BASE_URL}/uploads/printers/images-1760284241877.webp` },
    { id: 22, name: "Canon Pixma G7020", category: "Printers", price: 90399, image: `${BASE_URL}/uploads/printers/images-1760284241878.webp` },
    { id: 23, name: "Epson EcoTank L3150", category: "Printers", price: 3049, image: `${BASE_URL}/uploads/printers/images-1760284241880.webp` },
    { id: 24, name: "Brother HL-L2350DW", category: "Printers", price: 19009, image: `${BASE_URL}/uploads/printers/images-1760284241881.webp` },
    { id: 25, name: "Samsung Xpress M2020", category: "Printers", price: 19979, image: `${BASE_URL}/uploads/printers/images-1760284241880.webp` },

    // Processors
    { id: 26, name: "Intel i9-13900K", category: "Processors", price: 52890, image: `${BASE_URL}/uploads/processors/images-1760284197205.webp` },
    { id: 27, name: "AMD Ryzen 9 7950X", category: "Processors", price: 96909, image: `${BASE_URL}/uploads/processors/images-1760284197210.webp` },
    { id: 28, name: "Intel i7-13700K", category: "Processors", price: 84099, image: `${BASE_URL}/uploads/processors/images-1760284197211.webp` },
    { id: 29, name: "AMD Ryzen 7 7800X", category: "Processors", price: 4659, image: `${BASE_URL}/uploads/processors/images-1760284268947.webp` },
    { id: 30, name: "Intel i5-13600K", category: "Processors", price: 2799, image: `${BASE_URL}/uploads/processors/images-1760284268950.webp` },

    // TVs
    { id: 31, name: "Samsung QN90B", category: "TVs", price: 149900, image: `${BASE_URL}/uploads/tv's/images-1760284268951.webp` },
    { id: 32, name: "LG C2 OLED", category: "TVs", price: 17099, image: `${BASE_URL}/uploads/tv's/images-1760284268952.webp` },
    { id: 33, name: "Sony Bravia X90J", category: "TVs", price: 12969, image: `${BASE_URL}/uploads/tv's/images-1760284301341.webp` },
    { id: 34, name: "TCL 6-Series", category: "TVs", price: 8909, image: `${BASE_URL}/uploads/tv's/images-1760284268951.webp` },
    { id: 35, name: "Panasonic HX940", category: "TVs", price: 9990, image: `${BASE_URL}/uploads/tv's/images-1760284301341.webp` },

    // Watches
    { id: 36, name: "Apple Watch Series 9", category: "Watches", price: 2000, image: `${BASE_URL}/uploads/watches/images-1760284197216.webp` },
    { id: 37, name: "Samsung Galaxy Watch 6", category: "Watches", price: 3409, image: `${BASE_URL}/uploads/watches/images-1760284197217.webp` },
    { id: 38, name: "Garmin Fenix 7", category: "Watches", price: 5990, image: `${BASE_URL}/uploads/watches/images-1760284197218.webp` },
    { id: 39, name: "Fitbit Versa 4", category: "Watches", price: 2029, image: `${BASE_URL}/uploads/watches/images-1760284197216.webp` },
    { id: 40, name: "Fossil Gen 6", category: "Watches", price: 5249, image: `${BASE_URL}/uploads/watches/images-1760284197217.webp` },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
        Product Gallery
      </h2>

      {/* ✅ Category Filter */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap gap-3 bg-white p-3 rounded-full shadow-md border border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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

      {/* ✅ Banner Carousel */}
      <div className="mb-6">
        <BannerCarousel />
      </div>

      {/* ✅ Product Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md border border-gray-100 rounded-2xl p-4 flex flex-col items-center hover:shadow-xl transition-all duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-slate-800 text-center">
              {product.name}
            </h3>
            <p className="text-teal-700 font-medium mt-1">
              ₹{product.price.toLocaleString()}
            </p>
            <button
              className="mt-3 px-5 py-2 bg-gradient-to-r from-teal-600 to-slate-600 text-white rounded-lg font-semibold shadow-md hover:from-teal-700 hover:to-slate-700 transition-all"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


