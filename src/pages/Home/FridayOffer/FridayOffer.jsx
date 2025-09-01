import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";

// Import product images (same location as previous components)
import alexa from "../../../assets/products/cover/alexa.png";
import redHeadPhone from "../../../assets/products/headphone/redHeadPhone.png";
import iwatch from "../../../assets/products/watch/iwatch.png";
import airpod from "../../../assets/products/airpod/5.png"; // Corrected AirPods image

const FridayOffer = () => {
  const formatPrice = (price) => {
    return `৳${price.toLocaleString("en-US")}`;
  };

  const offers = [
    {
      id: 1,
      category: "Virtual assistant",
      title: "Google Alexa",
      price: 41000,
      image: alexa,
      gradient: "from-pink-400 to-purple-500",
      buttonColor: "bg-white hover:bg-gray-100",
      buttonText: "text-white",
    },
    {
      id: 2,
      category: "Gaming Headphone",
      title: "JBL Series",
      price: 41000,
      image: redHeadPhone,
      gradient: "from-green-400 to-teal-500",
      buttonColor: "bg-white hover:bg-gray-100",
      buttonText: "text-green-600",
    },
    {
      id: 3,
      category: "Apple",
      title: "Smart Watch",
      price: 41000,
      image: iwatch,
      gradient: "from-blue-400 to-cyan-500",
      buttonColor: "bg-white hover:bg-gray-100",
      buttonText: "text-blue-600",
      showAppleIcon: true,
    },
    {
      id: 4,
      category: "Apple",
      title: "AirPods Pro",
      price: 25000,
      image: airpod,
      gradient: "from-orange-400 to-pink-500",
      buttonColor: "bg-white hover:bg-gray-100",
      buttonText: "text-purple-600",
      showAppleIcon: true,
    },
  ];

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              Friday{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Offers
              </span>
            </h2> 
          <p className="text-gray-600 max-w-md mx-auto mt-6">
            Grab exclusive deals on the latest gadgets today!
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Offer Cards */}
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative bg-gradient-to-br ${offer.gradient} rounded-xl shadow-lg overflow-hidden h-48 flex flex-col justify-between p-4`}
            >
              <div>
                <div className="flex items-center mb-1">
                  {offer.showAppleIcon && (
                    <div className="w-4 h-4 bg-white rounded mr-1 flex items-center justify-center">
                      <span className="text-xs">🍎</span>
                    </div>
                  )}
                  <span className="text-white text-xs font-medium opacity-90">
                    {offer.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {offer.title}
                </h3>
                {offer.price && (
                  <span className="text-lg font-bold text-white">
                    {formatPrice(offer.price)}
                  </span>
                )}
              </div>
              <button
                className={`flex items-center space-x-1 ${offer.buttonColor} py-1.5 px-4 rounded-full font-semibold text-xs w-fit transition-colors duration-200`}
              >
                <span>Shop Now</span>
                {offer.showAppleIcon && <ArrowRight className="w-3 h-3" />}
              </button>

              {/* Right Side Image Vertically Center */}
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 object-contain"
              />
            </div>
          ))}

          {/* Black Friday Main Deal (Spans 2 columns on large screens) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="relative h-80 bg-black rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                  HELLO, <br className="sm:hidden" />
                  <span className="text-yellow-400">FRIDAY...</span>
                </h2>
                <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-4">
                  <div className="bg-yellow-400 text-black w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                    <span className="text-base sm:text-lg font-bold">15%</span>
                  </div>
                  <div className="bg-orange-500 text-white w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold">20%</span>
                  </div>
                  <div className="bg-red-500 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                    <span className="text-base sm:text-lg font-bold">25%</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-lg mb-2">
                  YOUR PURCHASE TODAY ONLY!
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  WHILE YOUR OFFER LASTS...
                </p>
                <button className="bg-yellow-400 text-black py-2 sm:py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-lg mx-auto transition-colors duration-200 hover:bg-yellow-500">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridayOffer;
