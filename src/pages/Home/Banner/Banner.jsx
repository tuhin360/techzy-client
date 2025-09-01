import bannerImage from "../../../assets/banner/1.jpg"; // Adjust path as needed
import { ShoppingBag, Star, Truck, Shield } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative max-w-7xl mx-auto min-h-[380px] sm:min-h-[450px] lg:min-h-[520px] overflow-hidden bg-gray-900">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${bannerImage})`,
          transform: "scale(1.05)",
        }}
      >
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto text-center my-4">
          {/* Sale Badge */}
          <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-400 to-rose-600 text-white rounded-full text-sm sm:text-base font-medium mb-5 shadow-lg animate-pulse">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            EXCLUSIVE MEGA SALE
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-amber-300 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              TECHZY
            </span>
            <br />
            <span className="text-white">ULTRA INNOVATION</span>
          </h1>

          {/* Discount Text */}
          <div className="text-lg sm:text-2xl md:text-3xl font-bold text-amber-300 mb-4">
            UP TO 80% OFF
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-gray-100 mb-6 max-w-2xl mx-auto leading-relaxed font-light">
            Unleash the future with cutting-edge gadgets and electronics at
            irresistible prices. Premium quality, authentic products, guaranteed
            satisfaction.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 text-white">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Truck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium">
                Free Shipping
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium">
                2-Year Warranty
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium">
                50K+ Satisfied Customers
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className="group relative px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-md text-sm sm:text-base">
              <ShoppingBag className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Shop Now & Save Big
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>

            <button className="px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-amber-300 text-amber-300 font-semibold rounded-full hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 shadow-md text-sm sm:text-base">
              Explore All Deals
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 lg:h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
};

export default Banner;
