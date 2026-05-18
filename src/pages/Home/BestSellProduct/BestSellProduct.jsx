import { ArrowRight } from "lucide-react";
import useProducts from "../../../hooks/useProducts";
import useWishlist from "../../../hooks/useWishlist"; // ✅ shared wishlist hook

import { BestSellProductCard } from "../../../components/BestSellProductCard";
import { BestSellerCardSkeleton } from "../../../components/BestSellerCardSkeleton";
import SharedTitleSection from "../../../components/SharedTitleSection/SharedTitleSection";
import { Link } from "react-router-dom";

const BestSellProduct = () => {
  const { products, loading, error } = useProducts();
  const { wishlistIds, toggleWishlist } = useWishlist(); // ✅ use shared hook

  // Filter only "best-seller" tagged products
  const bestSellProducts = products.filter((p) =>
    p.tags?.includes("best-seller")
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <SharedTitleSection
          title="Best"
          highlight="Sellers"
          subtitle="Top-rated products loved by thousands of customers worldwide"
        />

        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? [...Array(8)].map((_, i) => <BestSellerCardSkeleton key={i} />)
            : bestSellProducts.slice(0, 8).map((product, index) => (
                <BestSellProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlistIds} // centralized wishlist
                  toggleWishlist={toggleWishlist} // centralized toggle
                  index={index}
                />
              ))}

          {!loading && bestSellProducts.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No best-seller products found.
            </p>
          )}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-16">
          <Link to="/all-bestSeller-products">
            <button className="inline-flex items-center px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg cursor-pointer">
              <span className="text-sm md:text-lg">Show More</span>
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6 ml-2 md:ml-3" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellProduct;
