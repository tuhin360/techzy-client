import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import useWishlist from "../../hooks/useWishlist";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CategoryProduct = () => {
  const { category } = useParams(); // from /category/:category
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Centralized wishlist from hook
  const { wishlistIds, toggleWishlist } = useWishlist();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Responsive default showing grid nicely
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Fetch Category Products
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset page to 1 whenever category changes

    axiosPublic
      .get(`/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching category products:", err))
      .finally(() => setLoading(false));
  }, [category, axiosPublic]);

  // Smooth scroll to top on pagination page changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>Techzy | {category || "Category"}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-16">
        <SharedTitleSection
          title={category}
          highlight="Products"
          subtitle={`Discover premium authentic ${category?.toLowerCase() || "gadget"} devices`}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
          {loading ? (
            Array.from({ length: productsPerPage }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlist={wishlistIds}
                toggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 p-8">
              <p className="text-lg font-bold text-gray-500">No products found in this category.</p>
              <p className="text-xs text-gray-400 mt-1">Please explore our other tech sections!</p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3.5 py-2 rounded-lg font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
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
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryProduct;
