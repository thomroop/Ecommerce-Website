// src/pages/product/ProductList.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cartcontext";
import BannerCarousel from "../../components/layout/BannerCarousel"; // adjust path if needed

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const BASE_URL = "http://localhost:8080";

  const products = [
    // AirPods
    { id: 1, name: "AirPods Pro", category: "AirPods", price: 249, image: `${BASE_URL}/uploads/airpods/images-1760281187698.webp` },
    { id: 2, name: "AirPods 3rd Gen", category: "AirPods", price: 199, image: `${BASE_URL}/uploads/airpods/images-1760283908533.webp` },
    { id: 3, name: "AirPods Max", category: "AirPods", price: 549, image: `${BASE_URL}/uploads/airpods/images-1760283908537.webp` },
    { id: 4, name: "AirPods Pro 2", category: "AirPods", price: 279, image: `${BASE_URL}/uploads/airpods/images-1760283908539.webp` },
    { id: 5, name: "AirPods 2nd Gen", category: "AirPods", price: 159, image: `${BASE_URL}/uploads/airpods/images-1760284241875.webp` },
    // Cameras
    { id: 6, name: "Canon EOS R5", category: "Camera", price: 3899, image: `${BASE_URL}/uploads/cameras/images-1760284241876.jpg` },
    { id: 7, name: "Sony Alpha 7 IV", category: "Camera", price: 2799, image: `${BASE_URL}/uploads/cameras/images-1760284241877.jpg` },
    { id: 8, name: "Nikon Z6 II", category: "Camera", price: 1999, image: `${BASE_URL}/uploads/cameras/images-1760284268943.jpg` },
    { id: 9, name: "Canon EOS R6", category: "Camera", price: 2499, image: `${BASE_URL}/uploads/cameras/images-1760284268944.jpg` },
    { id: 10, name: "Sony Alpha 1", category: "Camera", price: 6499, image: `${BASE_URL}/uploads/cameras/images-1760284241876.jpg` },
    // Earphones
    { id: 11, name: "Bose QuietComfort Earbuds", category: "Earphones", price: 279, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 12, name: "Sony WF-1000XM4", category: "Earphones", price: 249, image: `${BASE_URL}/uploads/earphones/images-1760284197214.webp` },
    { id: 13, name: "JBL Live 300TWS", category: "Earphones", price: 149, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 14, name: "Apple EarPods", category: "Earphones", price: 29, image: `${BASE_URL}/uploads/earphones/images-1760284197212.webp` },
    { id: 15, name: "Samsung Galaxy Buds 2", category: "Earphones", price: 129, image: `${BASE_URL}/uploads/earphones/images-1760284197214.webp` },
    // Mobiles
    { id: 16, name: "iPhone 15 Pro", category: "Mobiles", price: 1099, image: `${BASE_URL}/uploads/mobiles/images-1760284332734.webp` },
    { id: 17, name: "Samsung Galaxy S23", category: "Mobiles", price: 999, image: `${BASE_URL}/uploads/mobiles/images-1760284332735.webp` },
    { id: 18, name: "Google Pixel 8", category: "Mobiles", price: 899, image: `${BASE_URL}/uploads/mobiles/images-1760284332739.webp` },
    { id: 19, name: "OnePlus 12", category: "Mobiles", price: 799, image: `${BASE_URL}/uploads/mobiles/images-1760284332735.webp` },
    { id: 20, name: "Xiaomi 14 Pro", category: "Mobiles", price: 699, image: `${BASE_URL}/uploads/mobiles/images-1760284332739.webp` },


    // Printers
    { id: 21, name: "HP LaserJet Pro", category: "Printers", price: 299, image: `${BASE_URL}/uploads/printers/images-1760284241877.webp` },
    { id: 22, name: "Canon Pixma G7020", category: "Printers", price: 399, image: `${BASE_URL}/uploads/printers/images-1760284241878.webp` },
    { id: 23, name: "Epson EcoTank L3150", category: "Printers", price: 349, image: `${BASE_URL}/uploads/printers/images-1760284241880.webp` },
    { id: 24, name: "Brother HL-L2350DW", category: "Printers", price: 199, image: `${BASE_URL}/uploads/printers/images-1760284241881.webp` },
    { id: 25, name: "Samsung Xpress M2020", category: "Printers", price: 179, image: `${BASE_URL}/uploads/printers/images-1760284241880.webp` },

    // Processors
    { id: 26, name: "Intel i9-13900K", category: "Processors", price: 589, image: `${BASE_URL}/uploads/processors/images-1760284197205.webp` },
    { id: 27, name: "AMD Ryzen 9 7950X", category: "Processors", price: 699, image: `${BASE_URL}/uploads/processors/images-1760284197210.webp` },
    { id: 28, name: "Intel i7-13700K", category: "Processors", price: 409, image: `${BASE_URL}/uploads/processors/images-1760284197211.webp` },
    { id: 29, name: "AMD Ryzen 7 7800X", category: "Processors", price: 459, image: `${BASE_URL}/uploads/processors/images-1760284268947.webp` },
    { id: 30, name: "Intel i5-13600K", category: "Processors", price: 299, image: `${BASE_URL}/uploads/processors/images-1760284268950.webp` },

    // TVs
    { id: 31, name: "Samsung QN90B", category: "TVs", price: 1499, image: `${BASE_URL}/uploads/tv's/images-1760284268951.webp` },
    { id: 32, name: "LG C2 OLED", category: "TVs", price: 1799, image: `${BASE_URL}/uploads/tv's/images-1760284268952.webp` },
    { id: 33, name: "Sony Bravia X90J", category: "TVs", price: 1299, image: `${BASE_URL}/uploads/tv's/images-1760284301341.webp` },
    { id: 34, name: "TCL 6-Series", category: "TVs", price: 899, image: `${BASE_URL}/uploads/tv's/images-1760284268951.webp` },
    { id: 35, name: "Panasonic HX940", category: "TVs", price: 999, image: `${BASE_URL}/uploads/tv's/images-1760284301341.webp` },

    // Watches
    { id: 36, name: "Apple Watch Series 9", category: "Watches", price: 399, image: `${BASE_URL}/uploads/watches/images-1760284197216.webp` },
    { id: 37, name: "Samsung Galaxy Watch 6", category: "Watches", price: 349, image: `${BASE_URL}/uploads/watches/images-1760284197217.webp` },
    { id: 38, name: "Garmin Fenix 7", category: "Watches", price: 599, image: `${BASE_URL}/uploads/watches/images-1760284197218.webp` },
    { id: 39, name: "Fitbit Versa 4", category: "Watches", price: 229, image: `${BASE_URL}/uploads/watches/images-1760284197216.webp` },
    { id: 40, name: "Fossil Gen 6", category: "Watches", price: 249, image: `${BASE_URL}/uploads/watches/images-1760284197217.webp` },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600 text-center">Product List</h2>

      {/* Centered Category Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap gap-3 bg-gray-100 p-3 rounded-full shadow-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-yellow-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="mb-6">
        <BannerCarousel />
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md p-3 rounded-lg flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-contain rounded-md mb-3"
            />
            <h3 className="text-md font-semibold text-center">{product.name}</h3>
            <p className="text-gray-600 font-medium">₹{product.price.toLocaleString()}</p>
            <button
              className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-orange-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

