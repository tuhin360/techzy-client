import { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import SharedScrollToTop from "../../components/SharedScrollToTop/SharedScrollToTop";

const AllFridayOfferProducts = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Filter "offered" products only
  const offeredProducts = products.filter((p) => p.tags?.includes("offered"));

  // Pagination calculation
  const totalPages = Math.ceil(offeredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = offeredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
          title="Friday"
          highlight="Offers"
          subtitle="Grab exclusive deals on the latest gadgets today!"
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
      </div>
    </section>
  );
};

export default AllFridayOfferProducts;
