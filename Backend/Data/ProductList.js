// @desc    Product Data - Contains sample product listings used for seeding or frontend display
// @route   Data File
// @access  Public

// Backend/data/ProductList.js

const productData = [
  // AirPods
  { name: "AirPods Pro", category: "AirPods", price: 249, image: "/uploads/airpods/images-1760281187698.webp", stock: 20, description: "High-quality wireless earbuds" },
  { name: "AirPods 3rd Gen", category: "AirPods", price: 199, image: "/uploads/airpods/images-1760283908533.webp", stock: 25, description: "Comfortable fit and spatial audio" },
  { name: "AirPods Max", category: "AirPods", price: 549, image: "/uploads/airpods/images-1760283908537.webp", stock: 15, description: "Premium over-ear headphones" },
  { name: "AirPods Pro 2", category: "AirPods", price: 279, image: "/uploads/airpods/images-1760283908539.webp", stock: 20, description: "Noise-cancelling AirPods Pro 2nd Gen" },
  { name: "AirPods 2nd Gen", category: "AirPods", price: 159, image: "/uploads/airpods/images-1760284241875.webp", stock: 30, description: "Classic AirPods with great battery life" },

  // Cameras
  { name: "Canon EOS R5", category: "Camera", price: 3899, image: "/uploads/cameras/images-1760284241876.jpg", stock: 10, description: "Professional mirrorless camera" },
  { name: "Sony Alpha 7 IV", category: "Camera", price: 2799, image: "/uploads/cameras/images-1760284241877.jpg", stock: 12, description: "Versatile mirrorless camera for creators" },
  { name: "Nikon Z6 II", category: "Camera", price: 1999, image: "/uploads/cameras/images-1760284268943.jpg", stock: 14, description: "Full-frame mirrorless camera" },
  { name: "Canon EOS R6", category: "Camera", price: 2499, image: "/uploads/cameras/images-1760284268944.jpg", stock: 18, description: "High-speed mirrorless camera" },
  { name: "Sony Alpha 1", category: "Camera", price: 6499, image: "/uploads/cameras/images-1760284241876.jpg", stock: 6, description: "Top-end mirrorless camera for professionals" },

  // Earphones
  { name: "Bose QuietComfort Earbuds", category: "Earphones", price: 279, image: "/uploads/earphones/images-1760284197212.webp", stock: 25, description: "Noise cancelling wireless earbuds" },
  { name: "Sony WF-1000XM4", category: "Earphones", price: 249, image: "/uploads/earphones/images-1760284197214.webp", stock: 30, description: "Top-rated sound quality and ANC" },
  { name: "JBL Live 300TWS", category: "Earphones", price: 149, image: "/uploads/earphones/images-1760284197212.webp", stock: 35, description: "Powerful bass and all-day comfort" },
  { name: "Apple EarPods", category: "Earphones", price: 29, image: "/uploads/earphones/images-1760284197212.webp", stock: 50, description: "Classic wired Apple earphones" },
  { name: "Samsung Galaxy Buds 2", category: "Earphones", price: 129, image: "/uploads/earphones/images-1760284197214.webp", stock: 40, description: "Compact wireless earbuds" },

  // Mobiles
  { name: "iPhone 15 Pro", category: "Mobiles", price: 1099, image: "/uploads/mobiles/images-1760284332734.webp", stock: 12, description: "Latest iPhone 15 Pro smartphone" },
  { name: "Samsung Galaxy S23", category: "Mobiles", price: 999, image: "/uploads/mobiles/images-1760284332735.webp", stock: 14, description: "Flagship Samsung Galaxy S23" },
  { name: "Google Pixel 8", category: "Mobiles", price: 899, image: "/uploads/mobiles/images-1760284332739.webp", stock: 10, description: "Google’s premium Android phone" },
  { name: "OnePlus 12", category: "Mobiles", price: 799, image: "/uploads/mobiles/images-1760284332735.webp", stock: 16, description: "High-performance smartphone" },
  { name: "Xiaomi 14 Pro", category: "Mobiles", price: 699, image: "/uploads/mobiles/images-1760284332739.webp", stock: 20, description: "Affordable flagship smartphone" },

  // Printers
  { name: "HP LaserJet Pro", category: "Printers", price: 299, image: "/uploads/printers/images-1760284241877.webp", stock: 25, description: "Compact laser printer" },
  { name: "Canon Pixma G7020", category: "Printers", price: 399, image: "/uploads/printers/images-1760284241878.webp", stock: 18, description: "All-in-one ink tank printer" },
  { name: "Epson EcoTank L3150", category: "Printers", price: 349, image: "/uploads/printers/images-1760284241880.webp", stock: 20, description: "Economical wireless printer" },
  { name: "Brother HL-L2350DW", category: "Printers", price: 199, image: "/uploads/printers/images-1760284241881.webp", stock: 22, description: "Fast and efficient printer" },
  { name: "Samsung Xpress M2020", category: "Printers", price: 179, image: "/uploads/printers/images-1760284241880.webp", stock: 28, description: "Compact monochrome printer" },

  // Processors
  { name: "Intel i9-13900K", category: "Processors", price: 589, image: "/uploads/processors/images-1760284197205.webp", stock: 15, description: "High-end desktop processor" },
  { name: "AMD Ryzen 9 7950X", category: "Processors", price: 699, image: "/uploads/processors/images-1760284197210.webp", stock: 10, description: "Flagship Ryzen 9 processor" },
  { name: "Intel i7-13700K", category: "Processors", price: 409, image: "/uploads/processors/images-1760284197211.webp", stock: 20, description: "Powerful mid-range CPU" },
  { name: "AMD Ryzen 7 7800X", category: "Processors", price: 459, image: "/uploads/processors/images-1760284268947.webp", stock: 18, description: "Ryzen 7 high-performance CPU" },
  { name: "Intel i5-13600K", category: "Processors", price: 299, image: "/uploads/processors/images-1760284268950.webp", stock: 25, description: "Best value Intel processor" },

  // TVs
  { name: "Samsung QN90B", category: "TVs", price: 1499, image: "/uploads/tv's/images-1760284268951.webp", stock: 10, description: "4K Neo QLED Smart TV" },
  { name: "LG C2 OLED", category: "TVs", price: 1799, image: "/uploads/tv's/images-1760284268952.webp", stock: 8, description: "Ultra-thin OLED Smart TV" },
  { name: "Sony Bravia X90J", category: "TVs", price: 1299, image: "/uploads/tv's/images-1760284301341.webp", stock: 12, description: "4K HDR Smart TV" },
  { name: "TCL 6-Series", category: "TVs", price: 899, image: "/uploads/tv's/images-1760284268951.webp", stock: 14, description: "Affordable 4K HDR TV" },
  { name: "Panasonic HX940", category: "TVs", price: 999, image: "/uploads/tv's/images-1760284301341.webp", stock: 15, description: "LED Smart TV with great contrast" },

  // Watches
  { name: "Apple Watch Series 9", category: "Watches", price: 399, image: "/uploads/watches/images-1760284197216.webp", stock: 20, description: "Advanced smartwatch with fitness tracking" },
  { name: "Samsung Galaxy Watch 6", category: "Watches", price: 349, image: "/uploads/watches/images-1760284197217.webp", stock: 18, description: "Smartwatch with health monitoring" },
  { name: "Garmin Fenix 7", category: "Watches", price: 599, image: "/uploads/watches/images-1760284197218.webp", stock: 12, description: "Rugged multisport smartwatch" },
  { name: "Fitbit Versa 4", category: "Watches", price: 229, image: "/uploads/watches/images-1760284197216.webp", stock: 25, description: "Lightweight fitness watch" },
  { name: "Fossil Gen 6", category: "Watches", price: 249, image: "/uploads/watches/images-1760284197217.webp", stock: 22, description: "Stylish smartwatch with Wear OS" }
];

export default productData;
