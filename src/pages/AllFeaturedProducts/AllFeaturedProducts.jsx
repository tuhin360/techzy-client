import { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import SharedScrollToTop from "../../components/SharedScrollToTop/SharedScrollToTop";
import useWishlist from "../../hooks/useWishlist"; // ✅ shared wishlist hook

const AllFeaturedProducts = () => {
  const { products, loading, error } = useProducts();
  const { wishlistIds, toggleWishlist } = useWishlist(); // ✅ use shared wishlist
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter featured products
  const featuredProducts = products.filter((p) => p.tags?.includes("featured"));

  // Pagination calculation
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = featuredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (error)
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-20">
      <SharedScrollToTop />
      <div className="px-4 sm:px-6 lg:px-0">
        <SharedTitleSection
          title="Featured"
          highlight="Products"
          subtitle="Check out our top featured products with exclusive offers"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: productsPerPage }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlistIds} // ✅ shared wishlist
                  toggleWishlist={toggleWishlist} // ✅ shared toggle
                />
              ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {!loading && featuredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No featured products available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default AllFeaturedProducts;
