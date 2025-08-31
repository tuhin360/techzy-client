import React, { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";

// Import product images (adjust paths as needed)
import airpod1 from "../../../assets/products/airpod/1.jpeg";
import gopro from "../../../assets/products/camera/gopro.jpg";
import djimavic2 from "../../../assets/products/drone/djimavic2.jpg";
import headphone from "../../../assets/products/headphone/1.jpeg";
import watch1 from "../../../assets/products/watch/smartwatch1.jpg";
import iphone17 from "../../../assets/products/phone/iphone.jpg";
import laptop1 from "../../../assets/products/laptop/laptop1.jpg";
import powerbank from "../../../assets/products/battery/2.jpg";
import { ArrowRight } from "lucide-react";

const NewProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Updated product data
  const products = [
    {
      id: 1,
      title: "Apple AirPods Pro (2nd Gen)",
      price: 28000,
      originalPrice: 33000,
      discount: 15,
      rating: 4.8,
      reviews: 245,
      image: airpod1,
      isNew: true,
      badge: "Best Seller",
    },
    {
      id: 2,
      title: "GoPro HERO12 Black",
      price: 65000,
      originalPrice: 72000,
      discount: 10,
      rating: 4.7,
      reviews: 134,
      image: gopro,
      isNew: true,
      badge: "Adventure Cam",
    },
    {
      id: 3,
      title: "DJI Mavic 2 Pro Drone",
      price: 185000,
      originalPrice: 210000,
      discount: 12,
      rating: 4.9,
      reviews: 98,
      image: djimavic2,
      isNew: true,
      badge: "Aerial Pro",
    },
    {
      id: 4,
      title: "Sony WH-1000XM5 Headphones",
      price: 42000,
      originalPrice: 48000,
      discount: 12,
      rating: 4.9,
      reviews: 301,
      image: headphone,
      isNew: true,
      badge: "Premium Audio",
    },
    {
      id: 5,
      title: "Apple Watch Series 9",
      price: 52000,
      originalPrice: 58000,
      discount: 10,
      rating: 4.7,
      reviews: 190,
      image: watch1,
      isNew: true,
      badge: "Fitness Pro",
    },
    {
      id: 6,
      title: "iPhone 17 Pro Max",
      price: 190000,
      originalPrice: 210000,
      discount: 9,
      rating: 4.8,
      reviews: 276,
      image: iphone17,
      isNew: true,
      badge: "Flagship",
    },
    {
      id: 7,
      title: "ASUS ROG Gaming Laptop (RTX 4060)",
      price: 155000,
      originalPrice: 175000,
      discount: 11,
      rating: 4.6,
      reviews: 152,
      image: laptop1,
      isNew: true,
      badge: "Gaming Beast",
    },
    {
      id: 8,
      title: "Anker 20000mAh Power Bank",
      price: 5500,
      originalPrice: 7000,
      discount: 21,
      rating: 4.5,
      reviews: 412,
      image: powerbank,
      isNew: true,
      badge: "Hot Deal",
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
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("BDT", "৳");
  };

 


  return (
    <section className="py-16 ">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              New <span className="text-blue-600">Products</span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest technology and gadgets that will revolutionize
            your digital experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Product Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.badge}
                </span>
              </div>

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-12 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-200 ${
                    wishlist.includes(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300/e5e7eb/6b7280?text=Product+Image";
                  }}
                />

                {/* Quick View Button */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-2">
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
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Product Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {product.title}
                </h3>

                {/* Price Section */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      You save{" "}
                      {formatPrice(product.originalPrice - product.price)}
                    </p>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Product Card Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
           <button className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white font-bold rounded-2xl hover:from-gray-800 hover:via-blue-800 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
            <span className="text-lg">Explore All Products</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
