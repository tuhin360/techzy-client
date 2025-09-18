import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useProducts from "../../../hooks/useProducts";
import { ProductCard } from "../../../components/ProductCard";
import { SkeletonCard } from "../../../components/SkeletonCard";
import SharedTitleSection from "../../../components/SharedTitleSection/SharedTitleSection";

const NewProducts = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const newProducts = products.filter((p) => p.tags?.includes("new"));

  return (
    <section className="max-w-7xl mx-auto py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-0">
        <SharedTitleSection
          title="New"
          highlight="Products"
          subtitle="Discover the latest technology that will revolutionize your digital experience"
        />

        {error && (
          <div className="text-center py-10 text-red-500 font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : newProducts
                .slice(0, 6)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
        </div>

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

export default NewProducts;
