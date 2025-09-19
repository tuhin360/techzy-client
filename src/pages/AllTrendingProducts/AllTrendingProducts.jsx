import { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

const AllTrendingProducts = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ✅ Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ✅ শুধু trending products filter করলাম
  const trendingProducts = products.filter((p) => p.tags?.includes("trending"));

  // ✅ Pagination Logic
  const totalPages = Math.ceil(trendingProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = trendingProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-0">
        {/* Title Section */}
        <SharedTitleSection
          title="All Trending"
          highlight="Products"
          subtitle="Latest trending gadgets and electronics that customers love the most"
        />

        {/* Error state */}
        {error && (
          <div className="text-center py-10 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
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
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-pointer"
                  : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white cursor-pointer"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400  cursor-pointer"
                  : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTrendingProducts;
