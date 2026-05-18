import useWishlist from "../../../hooks/useWishlist";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ProductCard } from "../../../components/ProductCard";
import { useQueryClient } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, isLoading, refetch } = useWishlist();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Toggle wishlist item
  const handleToggleWishlist = async (productId) => {
    if (!user?.email) return alert("Please login first!");

    try {
      if (wishlist.some((item) => item._id === productId)) {
        // Remove from wishlist
        await axiosPublic.delete("/wishlist", {
          data: { email: user.email, productId },
        });
      } else {
        // Add to wishlist
        await axiosPublic.post("/wishlist", { email: user.email, productId });
      }

      // Refetch wishlist
      refetch();

      // Invalidate global wishlist query if used elsewhere (like Navbar)
      queryClient.invalidateQueries(["wishlist", user.email]);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Loading wishlist...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaRegHeart className="w-8 h-8 text-orange-600" />
          My Wishlist
        </h1>
        <p className="text-gray-600">All the products you love, saved in one place</p>
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
          <FaRegHeart className="w-20 h-20 text-gray-300 mx-auto mb-6 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our shop to add some favorites!
          </p>
          <Link to="/shop">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist.map((p) => p._id)} // Pass IDs for red heart check
              toggleWishlist={() => handleToggleWishlist(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
