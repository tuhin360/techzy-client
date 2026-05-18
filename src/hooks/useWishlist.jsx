import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAdmin from "./useAdmin";
import Swal from "sweetalert2";

const useWishlist = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();
  const queryClient = useQueryClient();

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
      Swal.fire({
        title: "Not Logged In",
        text: "Please login first to manage wishlist.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (isAdmin) {
      Swal.fire({
        title: "Action Restricted",
        text: "Admins are not allowed to add items to wishlist.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    // Capture previous wishlist state for rollback
    const previousWishlistIds = queryClient.getQueryData(["wishlistIds", user?.email]) || [];
    const isAdding = !previousWishlistIds.includes(productId);

    // Optimistically update query cache
    let updatedWishlistIds = [...previousWishlistIds];
    if (isAdding) {
      updatedWishlistIds.push(productId);
    } else {
      updatedWishlistIds = updatedWishlistIds.filter((id) => id !== productId);
    }
    queryClient.setQueryData(["wishlistIds", user?.email], updatedWishlistIds);

    try {
      if (isAdding) {
        await axiosPublic.post("/wishlist", { email: user.email, productId });
      } else {
        await axiosPublic.delete("/wishlist", {
          data: { email: user.email, productId },
        });
      }

      // Quietly refetch in the background to ensure absolute sync
      refetchWishlistIds();
      refetchWishlist();
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      // Rollback to previous state on error
      queryClient.setQueryData(["wishlistIds", user?.email], previousWishlistIds);
      Swal.fire("Error", "Failed to update wishlist. Try again.", "error");
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
