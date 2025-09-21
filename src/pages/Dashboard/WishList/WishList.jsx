// import useWishlist from "../../../hooks/useWishlist";
// import { ProductCard } from "../../../components/ProductCard";

// const WishlistPage = () => {
//   const { wishlist, refetch, isLoading } = useWishlist();
//    // ✅ correct
//    console.log("Wishlist items:", wishlist);

//   if (isLoading) return <p>Loading wishlist...</p>;

//   return (
//     <div className="max-w-7xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <ProductCard key={item._id} product={item} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;  
 

// import useWishlist from "../../../hooks/useWishlist";
// import { ProductCard } from "../../../components/ProductCard";

// const WishlistPage = () => {
//   const { wishlist, isLoading, refetch } = useWishlist();

//   if (isLoading) return <p>Loading wishlist...</p>;

//   return (
//     <div className="max-w-7xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;


import useWishlist from "../../../hooks/useWishlist";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ProductCard } from "../../../components/ProductCard";
import { useQueryClient } from "@tanstack/react-query";

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

  if (isLoading) return <p className="text-center py-10">Loading wishlist...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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


