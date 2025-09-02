import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

export const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = () => {
    setWishlist((prev) =>
      prev.includes(product._id)
        ? prev.filter((id) => id !== product._id)
        : [...prev, product._id]
    );
  };

  const formatPrice = (price) => `৳${price?.toLocaleString("en-US")}`;

  return (
    <div className="relative bg-white rounded-xl shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
            {product.badge}
          </span>
        </div>
      )}

      {/* Discount */}
      {product.discount > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[11px] font-bold">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-12 right-3 z-10 p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
      >
        <Heart
          className={`w-4 h-4 ${
            wishlist.includes(product._id)
              ? "text-red-500 fill-red-500"
              : "text-gray-600"
          }`}
        />
      </button>

      {/* Image */}
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
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
