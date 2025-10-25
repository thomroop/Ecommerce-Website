// @desc    BannerCarousel Component - Displays rotating promotional banners with smooth transitions
// @route   Frontend Component
// @access  Public

import React, { useEffect, useState } from "react";
import banner1 from "../../assets/Banners/banner1.webp";
import banner2 from "../../assets/Banners/banner2.webp";
import banner3 from "../../assets/Banners/banner3.webp";

const BannerCarousel = () => {
  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="w-full h-48 sm:h-64 lg:h-80 overflow-hidden rounded-lg mb-6">
      <img
        src={banners[currentBanner]}
        alt={`Banner ${currentBanner + 1}`}
        className="w-full h-full object-cover transition-all duration-700"
      />
    </div>
  );
};

export default BannerCarousel;



