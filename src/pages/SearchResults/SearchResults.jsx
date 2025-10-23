import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ProductCard } from "../../components/ProductCard";
import useWishlist from "../../hooks/useWishlist";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const axiosPublic = useAxiosPublic();
  const { wishlistIds, toggleWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosPublic.get(`/products/search?query=${encodeURIComponent(query)}`);
        setProducts(response.data);
      } catch (err) {
        console.error("Search error:", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, axiosPublic]);

  // Pagination calculation
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* No Query */}
        {!query && !isLoading && (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Search for products
            </h3>
            <p className="text-gray-500">
              Enter a search term to find products
            </p>
          </div>
        )}

        {/* No Results */}
        {query && !isLoading && products.length === 0 && !error && (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && products.length > 0 && (
          <>
            <p className="text-gray-600 mb-6">
              Found {products.length} product{products.length !== 1 ? "s" : ""}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  wishlist={wishlistIds}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;