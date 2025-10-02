import { Heart, ShoppingCart, Star, Clock, Shield, Truck } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

export const FeaturedProductCard = ({ product, wishlist, toggleWishlist }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const formatPrice = (price) => `৳${price?.toLocaleString("en-US") || 0}`;

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      {/* Product Image */}
      <div className="relative">
        <div className="relative">
          {/* Badge */}
          {product.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                🔥 {product.badge}
              </div>
            </div>
          )}

          {/* Time Left */}
          {product.timeLeft && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{product.timeLeft}</span>
              </div>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product._id)}
            className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Heart
              className={`w-5 h-5 ${
                wishlist.includes(product._id)
                  ? "text-red-500 fill-red-500 cursor-pointer"
                  : "text-gray-600 hover:text-red-500 cursor-pointer"
              }`}
            />
          </button>

          <div className="h-80 sm:h-96 flex items-center justify-center">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {product.title}
        </h3>
        <p className="text-lg text-gray-600 mb-6">{product.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center mb-4">
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
          </div>
          <span className="text-sm font-semibold text-gray-900 ml-2">
            {product.rating || 0}
          </span>
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews?.toLocaleString() || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.discount}%
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-sm text-green-600 font-medium">
              You save {formatPrice(product.originalPrice - product.price)}
            </p>
          )}
        </div>

        {/* Key Features */}
        {product.features && (
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Key Features:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color Options */}
        {product.colors && (
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              Available Colors:
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
          >
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
  );
};

export default FeaturedProductCard;
