import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

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
    return `৳${price.toLocaleString("en-US")}`;
  };

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
             <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              New{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Products
              </span>
            </h2> 
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest technology that will revolutionize
            your digital experience
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              // Removed "group" and hover effects from container
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
                  {product.badge}
                </span>
              </div>

              {/* Discount */}
              {product.discount > 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
                    -{product.discount}%
                  </span>
                </div>
              )}

              {/* Wishlist - now always visible or static */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-12 right-3 z-10 p-1.5 bg-white rounded-full shadow transition hover:bg-gray-100"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.includes(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Image - NO HOVER ZOOM, NO TRANSFORM, NO ANIMATION */}
              <div className="relative h-56 bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center mb-1">
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
                  <span className="text-xs text-gray-500 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </p>
                  )}
                </div>

                {/* Cart Button */}
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-medium text-sm shadow hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 shadow-lg cursor-pointer">
            <span className="text-lg">Explore All Products</span>
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
