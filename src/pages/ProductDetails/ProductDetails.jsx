import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, refetchCart] = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();

  // Local UI states
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track selected image

  // Sync wishlist state on load or wishlistIds change
  useEffect(() => {
    setIsInWishlist(wishlistIds.includes(id));
  }, [wishlistIds, id]);

  // Fetch product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found!</p>;

  // Get images array - use product.image array if available, otherwise fallback
  const images =
    Array.isArray(product.image) && product.image.length > 0
      ? product.image
      : [product.image];

  // Calculate total price based on quantity
  const totalPrice = product.price * quantity;
  const originalTotalPrice = product.originalPrice * quantity;

  // Handle cart add
  const handleAddToCart = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please login first to add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      }).then(() => navigate("/login", { state: { from: location } }));
      return;
    }

    const alreadyInCart = cart.some(
      (item) => item.menuId === product._id && item.email === user.email
    );

    if (alreadyInCart) {
      Swal.fire({
        title: "Already in Cart",
        text: `${product.title} is already in your cart.`,
        icon: "info",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const cartItem = {
      menuId: product._id,
      email: user.email,
      title: product.title,
      image: images[0], // Use first image
      price: product.price,
      quantity,
      selectedColor,
    };

    try {
      const res = await axiosPublic.post("/carts", cartItem);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added to Cart!",
          text: `${product.title} has been added to your cart.`,
          icon: "success",
          confirmButtonColor: "#f97316",
        });
        refetchCart();
      }
    } catch {
      Swal.fire("Error!", "Could not add to cart.", "error");
    }
  };

  // Quantity handler
  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Wishlist handler
  const handleWishlistToggle = () => {
    if (!user?.email) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please login first to manage wishlist.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      }).then(() => navigate("/login", { state: { from: location } }));
      return;
    }

    toggleWishlist(product._id);
    Swal.fire({
      icon: isInWishlist ? "info" : "success",
      title: isInWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      text: product.title,
      confirmButtonColor: "#f97316",
    });

    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10 shadow-lg">
                {product.badge}
              </span>
            )}
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                -{product.discount}%
              </span>
            )}
            <img
              src={images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover"
            />
          </div>

          {/* Thumbnail Gallery - Show all 4 images */}
          <div className="grid grid-cols-4 gap-3">
            {images.slice(0, 4).map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition ${
                  selectedImageIndex === index
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-lg text-gray-600">{product.subtitle}</p>
            )}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-700 font-medium">
                {product.rating}
              </span>
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
            {product.sold && (
              <span className="text-gray-500">• {product.sold} sold</span>
            )}
          </div>

          {/* Price - Dynamic based on quantity */}
          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-baseline space-x-3 flex-wrap">
              <span className="text-sm text-gray-600">Unit Price:</span>
              <span className="text-2xl font-semibold text-gray-700">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
            </div>

            {quantity > 1 && (
              <div className="flex items-center space-x-3 mt-3 flex-wrap">
                <span className="text-sm text-gray-600">Total Price:</span>
                <span className="text-4xl font-bold text-blue-600">
                  ৳{totalPrice.toLocaleString()}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-2xl text-gray-400 line-through">
                      ৳{originalTotalPrice.toLocaleString()}
                    </span>
                  )}
              </div>
            )}

            {product.discount > 0 && (
              <p className="text-green-600 font-semibold mt-2 text-lg">
                You save ৳
                {(
                  (product.originalPrice - product.price) *
                  quantity
                ).toLocaleString()}{" "}
                ({product.discount}% off)
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Available Colors
              </h3>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-lg capitalize font-medium transition ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quantity
            </h3>
            <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                -
              </button>
              <span className="px-6 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Time Left */}
          {product.timeLeft && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-700 font-semibold flex items-center">
                ⏳ Hurry! Only {product.timeLeft}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition cursor-pointer"
            >
              Add to Cart - ৳{totalPrice.toLocaleString()}
            </button>

            <button
              onClick={handleWishlistToggle}
              className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center cursor-pointer"
            >
              <svg
                className={`w-6 h-6 mr-2 ${
                  isInWishlist ? "text-red-500 fill-red-500" : ""
                }`}
                fill={isInWishlist ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">🚚</div>
            <div>
              <h4 className="font-semibold text-gray-900">Free Delivery</h4>
              <p className="text-sm text-gray-600">On orders over ৳1000</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">✅</div>
            <div>
              <h4 className="font-semibold text-gray-900">Warranty</h4>
              <p className="text-sm text-gray-600">1 Year Warranty</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">🔄</div>
            <div>
              <h4 className="font-semibold text-gray-900">Easy Returns</h4>
              <p className="text-sm text-gray-600">7 Days Return Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
