import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import useWishlist from "../../hooks/useWishlist"; // ✅ shared hook

const AllNewProducts = () => {
  const { products, loading, error } = useProducts();
  const { wishlistIds, toggleWishlist } = useWishlist(); // ✅ use shared hook

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter only new products
  const newProducts = products.filter((p) => p.tags?.includes("new"));

  // Pagination calculation
  const totalPages = Math.ceil(newProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = newProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-0">
      {/* Title Section */}
      <SharedTitleSection
        title="All New"
        highlight="Products"
        subtitle="Latest trending gadgets and electronics that customers love the most"
      />

      {error && (
        <div className="text-center py-10 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlist={wishlistIds} // ✅ centralized wishlist
                toggleWishlist={toggleWishlist} // ✅ centralized toggle
              />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </button>

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

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {newProducts.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">
          No new products available right now.
        </p>
      )}
    </section>
  );
};

export default AllNewProducts;
