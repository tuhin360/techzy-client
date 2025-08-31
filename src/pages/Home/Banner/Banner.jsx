import bannerImage from '../../../assets/banner/1.jpg'; // Adjust path as needed
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const Banner = () => {
    return (
      <div className="relative max-w-7xl mx-auto min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gray-900">
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
          <div className="w-full max-w-7xl mx-auto text-center my-6">
            {/* Sale Badge */}
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-400 to-rose-600 text-white rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-lg animate-pulse ">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              EXCLUSIVE MEGA SALE
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                TECHZY
              </span>
              <br />
              <span className="text-white">ULTRA INNOVATION</span>
            </h1>

            {/* Discount Text */}
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-300 mb-4 sm:mb-6 tracking-wide">
              UP TO 80% OFF
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light">
              Unleash the future with cutting-edge gadgets and electronics at
              irresistible prices. Premium quality, authentic products,
              guaranteed satisfaction.
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 text-white">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                <span className="text-xs sm:text-base font-medium">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                <span className="text-xs sm:text-base font-medium">
                  2-Year Warranty
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                <span className="text-xs sm:text-base font-medium">
                  50K+ Satisfied Customers
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-500 shadow-xl">
                <ShoppingBag className="inline w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Shop Now & Save Big
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
              </button>

              <button className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-amber-300 text-amber-300 font-semibold rounded-full hover:bg-amber-300 hover:text-gray-900 transition-all duration-300 shadow-md">
                Explore All Deals
              </button>
            </div>

            {/* Countdown Timer with Glassmorphism */}
            <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
              <p className="text-amber-300 font-semibold text-sm sm:text-lg mb-3 sm:mb-4">
                Hurry, Sale Ends In:
              </p>
              <div className="flex justify-center space-x-2 sm:space-x-4 lg:space-x-6">
                {["05", "DAYS", "12", "HOURS", "45", "MINS", "30", "SECS"].map(
                  (item, index) =>
                    index % 2 === 0 && (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-lg px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-3 shadow-lg transform hover:scale-110 transition-transform duration-300"
                      >
                        <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">
                          {item}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">
                          {["DAYS", "HOURS", "MINS", "SECS"][index / 2]}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements with Subtle Animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 lg:w-30 lg:h-30 bg-blue-400 bg-opacity-15 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-yellow-400 bg-opacity-15 rounded-full animate-float delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 bg-red-400 bg-opacity-15 rounded-full animate-float delay-2000 "></div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-40 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
    );
};

// Custom Tailwind CSS Animation
const styles = `
@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
}
`;

export default Banner;