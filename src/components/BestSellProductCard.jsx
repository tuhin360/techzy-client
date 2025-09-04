import { Heart, ShoppingCart, Star, TrendingUp, Award } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

export const BestSellProductCard = ({ product, wishlist, toggleWishlist, index }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const formatPrice = (price) =>
    price ? `৳${Number(price).toLocaleString("en-US")}` : "৳0 ";

  const formatSold = (sold) =>
    sold ? (sold >= 1000 ? `${(sold / 1000).toFixed(1)}k` : sold.toString()) : "0";

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: product._id,
        email: user.email,
        title: product.title,
        image: product.image,
        price: product.price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added to Cart!",
            text: `${product.title} has been added to your cart.`,
            icon: "success",
            confirmButtonColor: "#f97316",
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Not Logged In",
        text: "Please login first to add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      }).then(() => {
        navigate("/login", { state: { from: location } });
      });
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Bestseller Rank */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Award className="w-3 h-3" />
          <span>#{index + 1} Best Seller</span>
        </div>
      </div>

      {/* Category Badge */}
      {product.category && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>
      )}

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
        onClick={() => toggleWishlist(product._id)}
        className="absolute top-24 right-4 z-20 p-2 bg-white bg-opacity-90 rounded-full shadow-lg"
      >
        <Heart
          className={`w-5 h-5 ${
            wishlist.includes(product._id) ? "text-red-500 fill-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
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
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-medium text-gray-700 ml-2">
              {product.rating || 0}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews?.toLocaleString() || 0} reviews)
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
          {product.discount > 0 && product.originalPrice && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-3 cursor-pointer"
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
  );
};

export default BestSellProductCard;