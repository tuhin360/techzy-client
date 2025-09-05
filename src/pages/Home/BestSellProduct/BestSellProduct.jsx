import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useProducts from "../../../hooks/useProducts";

import { BestSellProductCard } from "../../../components/BestSellProductCard";
import { BestSellerCardSkeleton } from "../../../components/BestSellerCardSkeleton";

const BestSellProduct = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  // Filter only "best-seller" tagged products
  const bestSellProducts = products.filter((p) => p.tags?.includes("best-seller"));

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Best{" "}
            <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Sellers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Top-rated products loved by thousands of customers worldwide
          </p>
        </div>

        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading
            ? [...Array(6)].map((_, i) => <BestSellerCardSkeleton key={i} />)
            : bestSellProducts.map((product, index) => (
                <BestSellProductCard
                  key={product._id}
                  product={product}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  index={index}
                />
              ))}

          {!loading && bestSellProducts.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No best-seller products found.
            </p>
          )}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 shadow-lg cursor-pointer">
            <span className="text-lg">Explore All Products</span>
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellProduct;

