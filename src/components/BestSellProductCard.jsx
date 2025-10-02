import { Heart, ShoppingCart, Star, TrendingUp, Award } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

export const BestSellProductCard = ({
  product,
  wishlist,
  toggleWishlist,
  index,
}) => {
   const { title, image, price, originalPrice, discount, _id } = product;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const formatPrice = (price) =>
    price ? `৳${Number(price).toLocaleString("en-US")}` : "৳0";

  const formatSold = (sold) =>
    sold
      ? sold >= 1000
        ? `${(sold / 1000).toFixed(1)}k`
        : sold.toString()
      : "0";

  const handleAddToCart = () => {
    if (user?.email) {
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
      }).then(() => navigate("/login", { state: { from: location } }));
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">

         {/* Product Image → navigate to details */}
      <Link
        to={`/products/${_id}`}
        className="block relative h-56 bg-gray-50 overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </Link>

        {/* Bestseller Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Award className="w-3 h-3" />
          <span>#{index + 1}</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product._id)}
          className="absolute top-3 right-3 p-1 bg-white bg-opacity-80 rounded-full shadow"
        >
          <Heart
            className={`w-5 h-5 ${
              wishlist.includes(product._id)
                ? "text-red-500 fill-red-500 cursor-pointer"
                : "text-gray-600 cursor-pointer"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Sold overlay */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-600" />
          {formatSold(product.sold)} sold
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">
              {product.rating || 0}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.discount > 0 && product.originalPrice && (
            <span className="text-xs text-green-600 font-semibold">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
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

export default BestSellProductCard;
