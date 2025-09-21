import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useWishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch wishlist product IDs for this user
  const {
    data: wishlistIds = [],
    isLoading: isWishlistIdsLoading,
    refetch: refetchWishlistIds,
  } = useQuery({
    queryKey: ["wishlistIds", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/wishlist/${user.email}`);
      return res.data.map((item) => item.productId);
    },
  });

  // Fetch full product details based on wishlist IDs
  const {
    data: wishlist = [],
    isLoading: isWishlistLoading,
    refetch: refetchWishlist,
  } = useQuery({
    queryKey: ["wishlistProducts", wishlistIds],
    enabled: wishlistIds.length > 0,
    queryFn: async () => {
      const res = await axiosPublic.post("/products/bulk", {
        ids: wishlistIds,
      });
      return res.data; // array of full product objects
    },
  });

  // Toggle wishlist
  const toggleWishlist = async (productId) => {
    if (!user?.email) {
      alert("Please login first!");
      return;
    }

    try {
      if (wishlistIds.includes(productId)) {
        await axiosPublic.delete("/wishlist", {
          data: { email: user.email, productId },
        });
      } else {
        await axiosPublic.post("/wishlist", { email: user.email, productId });
      }

      // Refresh both queries
      refetchWishlistIds();
      refetchWishlist();
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return {
    wishlist, // full products
    wishlistIds, // productId array
    isLoading: isWishlistIdsLoading || isWishlistLoading,
    toggleWishlist,
    refetch: () => {
      refetchWishlistIds();
      refetchWishlist();
    },
  };
};

export default useWishlist;
