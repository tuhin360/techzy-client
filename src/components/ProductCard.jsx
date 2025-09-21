import { Heart, ShoppingCart, Star } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

export const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const { title, image, price, originalPrice, discount, _id } = product;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [, refetchCart] = useCart();

  // Check if item is in wishlist
  const isInWishlist = wishlist.includes(_id);

  // Add to Cart
  const handleAddToCart = () => {
    if (!user?.email) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please login first to add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      }).then(() => navigate("/login", { state: { from: location } }));
      return;
    }

    const cartItem = { menuId: _id, email: user.email, title, image, price };
    axiosPublic.post("/carts", cartItem)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added to Cart!",
            text: `${title} has been added to your cart.`,
            icon: "success",
            confirmButtonColor: "#f97316",
          });
          refetchCart();
        }
      })
      .catch(() => Swal.fire("Error!", "Could not add to cart.", "error"));
  };

  const formatPrice = (amount) => `৳${amount?.toLocaleString("en-US")}`;

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-shadow duration-300">
      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(_id)}
        className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
      >
        <Heart className={`w-5 h-5 cursor-pointer ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
      </button>

      {/* Product Image */}
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-all duration-300 cursor-pointer" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{product.rating} ({product.reviews})</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">{formatPrice(price)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          {discount > 0 && <p className="text-xs text-green-600 font-medium">Save {formatPrice(originalPrice - price)}</p>}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-medium text-sm shadow hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
