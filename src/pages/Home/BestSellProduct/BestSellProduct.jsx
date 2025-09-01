import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

// Import product images (same location as previous components)
import airpod1 from "../../../assets/products/airpod/1.jpeg";
import headphone from "../../../assets/products/headphone/1.jpeg";
import iphone17 from "../../../assets/products/phone/iphone.jpg";
import laptop1 from "../../../assets/products/laptop/laptop1.jpg";
import appleWatch from "../../../assets/products/trending/watch.jpg";
import canon from "../../../assets/products/trending/canon.jpg";

const BestSellProduct = () => {
  const [wishlist, setWishlist] = useState([]);
 
  const bestSellerProducts = [
    {
      id: 1,
      title: "Apple AirPods Pro (2nd Gen)",
      price: 28000,
      originalPrice: 33000,
      discount: 15,
      rating: 4.8,
      reviews: 1245,
      sold: 2340,
      image: airpod1,
      badge: "Top Seller",
      category: "Audio",
    },
    {
      id: 2,
      title: "iPhone 17 Pro Max",
      price: 190000,
      originalPrice: 210000,
      discount: 9,
      rating: 4.9,
      reviews: 876,
      sold: 1890,
      image: iphone17,
      badge: "Most Popular",
      category: "Mobile",
    },
    {
      id: 3,
      title: "Sony WH-1000XM5 Headphones",
      price: 42000,
      originalPrice: 48000,
      discount: 12,
      rating: 4.9,
      reviews: 1301,
      sold: 1560,
      image: headphone,
      badge: "Customer Choice",
      category: "Audio",
    },
    {
      id: 4,
      title: "Canon EOS R6 Mark II",
      price: 285000,
      originalPrice: 320000,
      discount: 11,
      rating: 4.8,
      reviews: 534,
      sold: 890,
      image: canon,
      badge: "Pro Choice",
      category: "Camera",
    },
    {
      id: 5,
      title: "Apple Watch Series 9",
      price: 45000,
      originalPrice: 52000,
      discount: 14,
      rating: 4.7,
      reviews: 990,
      sold: 1340,
      image: appleWatch,
      badge: "Trending",
      category: "Wearables",
    },
    {
      id: 6,
      title: "ASUS ROG Gaming Laptop",
      price: 155000,
      originalPrice: 175000,
      discount: 11,
      rating: 4.6,
      reviews: 652,
      sold: 780,
      image: laptop1,
      badge: "Gamer's Pick",
      category: "Computing",
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

  const formatSold = (sold) => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(1)}k`;
    }
    return sold.toString();
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              Best{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Sellers
              </span>
            </h2> 
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Top-rated products loved by thousands of customers worldwide
          </p>
           
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bestSellerProducts.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              style={{
                transition: "none !important",
                transform: "none !important",
              }}
            >
              {/* Bestseller Rank */}
              <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>#{index + 1} Best Seller</span>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-16 right-4 z-20">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-24 right-4 z-20 p-2 bg-white bg-opacity-90 rounded-full shadow-lg"
                style={{
                  transition: "none !important",
                  transform: "none !important",
                }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  style={{
                    transition: "none !important",
                    transform: "none !important",
                  }}
                />

                {/* Sales Stats Overlay */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-900">
                      {formatSold(product.sold)} sold
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating & Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Product Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {product.title}
                </h3>

                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-green-600">
                        Save{" "}
                        {formatPrice(product.originalPrice - product.price)}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-3"
                  style={{
                    transition: "none !important",
                    transform: "none !important",
                  }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>

                {/* Trust Indicators */}
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>✓ Free Shipping</span>
                  <span>✓ 30-Day Return</span>
                  <span>✓ Warranty</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellProduct;
