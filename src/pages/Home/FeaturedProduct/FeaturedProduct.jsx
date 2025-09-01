import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Zap,
  Clock,
  Shield,
  Truck,
} from "lucide-react";

// Import product images (same location as previous components)
import appleWatch from "../../../assets/products/watch/iwatch.png";
import iphone17 from "../../../assets/products/phone/iphone172.png";
import airpod5 from "../../../assets/products/airpod/5.png";

const FeaturedProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const featuredProducts = [
    {
      id: 1,
      title: "Apple Watch Series 9",
      subtitle: "Your health companion",
      price: 45000,
      originalPrice: 52000,
      discount: 14,
      rating: 4.8,
      reviews: 1234,
      image: appleWatch,
      features: [
        "S9 Chip",
        "Digital Crown",
        "Always-On Display",
        "GPS + Cellular",
      ],
      colors: ["Midnight", "Starlight", "Silver", "Product Red"],
      badge: "Most Popular",
      timeLeft: "1 day left",
    },
    {
      id: 2,
      title: "iPhone 17 Pro Max",
      subtitle: "The most advanced iPhone ever",
      price: 190000,
      originalPrice: 210000,
      discount: 9,
      rating: 4.9,
      reviews: 1876,
      image: iphone17,
      features: [
        "A18 Pro Chip",
        "48MP Camera System",
        "Titanium Design",
        "USB-C",
      ],
      colors: [
        "Space Black",
        "Natural Titanium",
        "White Titanium",
        "Blue Titanium",
      ],
      badge: "Limited Edition",
      timeLeft: "2 days left",
    },

    {
      id: 3,
      title: "AirPods Pro (2nd Gen)",
      subtitle: "Immersive audio experience",
      price: 28000,
      originalPrice: 33000,
      discount: 15,
      rating: 4.8,
      reviews: 2145,
      image: airpod5,
      features: [
        "H2 Chip",
        "Active Noise Cancellation",
        "Spatial Audio",
        "MagSafe Charging",
      ],
      colors: ["White"],
      badge: "Best Value",
      timeLeft: "3 days left",
    },
  ];

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return `৳${price.toLocaleString("en-US")}`;
  };

  const currentProduct = featuredProducts[selectedProduct];

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              Featured{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Product
              </span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md mx-auto mt-6">
            Discover our top picks with exclusive offers
          </p>
        </div>

        {/* Main Featured Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-10">
          {/* Product Image Side */}
          <div className="relative">
            <div className="relative ">
              {/* Featured Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                  🔥 {currentProduct.badge}
                </div>
              </div>

              {/* Time Left Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{currentProduct.timeLeft}</span>
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(currentProduct.id)}
                className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(currentProduct.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="h-80 sm:h-96 flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Product Details Side */}
          <div>
            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {currentProduct.title}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {currentProduct.subtitle}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(currentProduct.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 ml-2">
                {currentProduct.rating}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                ({currentProduct.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(currentProduct.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(currentProduct.originalPrice)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{currentProduct.discount}%
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save{" "}
                {formatPrice(
                  currentProduct.originalPrice - currentProduct.price
                )}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-3">
                Key Features:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div className="mb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-3">
                Available Colors:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProduct.colors.map((color, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs text-gray-600">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Selector */}
        <div className="flex flex-wrap justify-center gap-3">
          {featuredProducts.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(index)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                selectedProduct === index
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {product.title.split(" ")[0]} {product.title.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
