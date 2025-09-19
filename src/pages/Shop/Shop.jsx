import { Helmet } from "react-helmet-async";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import useProducts from "../../hooks/useProducts";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Shop = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination setup
  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  if (error)
    return (
      <div className="text-center py-20 text-xl font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Techzy | Shop</title>
      </Helmet>
      <section className="max-w-7xl mx-auto py-16 lg:py-20">
        <div className="px-4 sm:px-6 lg:px-0">
          <SharedTitleSection
            title="All"
            highlight="Products"
            subtitle="Browse through our entire product collection"
          />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: productsPerPage }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : currentProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-pointer"
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
    </>
  );
};
