import { Heart, ShoppingCart, Star, TrendingUp, Award } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";

export const BestSellProductCard = ({
  product,
  wishlist,
  toggleWishlist,
  index,
}) => {
  const { title, image, _id } = product;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const [isAdmin] = useAdmin();

  const formatPrice = (price) =>
    price ? `৳${Number(price).toLocaleString("en-US")}` : "৳0";

  const formatSold = (sold) =>
    sold
      ? sold >= 1000
        ? `${(sold / 1000).toFixed(1)}k`
        : sold.toString()
      : "0";

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

    if (isAdmin) {
      Swal.fire({
        title: "Action Restricted",
        text: "Admins are not allowed to add items to the cart.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const cartItem = {
      menuId: product._id,
      email: user.email,
      title: product.title,
      image: product.image,
      price: product.price,
    };

    axiosSecure
      .post("/carts", cartItem)
      .then((res) => {
        if (res.data.alreadyInCart) {
          Swal.fire({
            title: "Already in Cart",
            text: `${product.title} is already in your cart.`,
            icon: "info",
            confirmButtonColor: "#f97316",
          });
        } else if (res.data.insertedId) {
          Swal.fire({
            title: "Added to Cart!",
            text: `${product.title} has been added to your cart.`,
            icon: "success",
            confirmButtonColor: "#f97316",
          });
          refetch();
        }
      })
      .catch(() =>
        Swal.fire("Error!", "Could not add to cart. Try again later.", "error")
      );
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-40 md:h-56 bg-gray-100 overflow-hidden">
        {/* Product Image → navigate to details */}
        <Link
          to={`/products/${_id}`}
          className="block relative h-40 md:h-56 bg-gray-50 overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          />
        </Link>

        {/* Bestseller Badge */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[9px] md:text-xs font-bold flex items-center gap-0.5 md:gap-1">
          <Award className="w-2.5 h-2.5 md:w-3 md:h-3" />
          <span>#{index + 1}</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product._id)}
          className="absolute top-2 right-2 md:top-3 md:right-3 p-1 bg-white bg-opacity-80 rounded-full shadow"
        >
          <Heart
            className={`w-4 h-4 md:w-5 md:h-5 ${
              wishlist.includes(product._id)
                ? "text-red-500 fill-red-500 cursor-pointer"
                : "text-gray-600 cursor-pointer"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[9px] md:text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Sold overlay */}
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white bg-opacity-90 px-1.5 py-0.5 rounded-full text-[9px] md:text-xs font-semibold flex items-center gap-0.5 md:gap-1">
          <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" />
          {formatSold(product.sold)} sold
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        {/* Title */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 h-8 md:h-10 mb-1">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-[10px] md:text-xs text-gray-600 ml-0.5">
              {product.rating || 0}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base md:text-lg font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.discount > 0 && product.originalPrice && (
            <span className="text-[10px] md:text-xs text-green-600 font-semibold">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 md:py-3 rounded-lg font-medium text-xs md:text-sm shadow hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BestSellProductCard;
