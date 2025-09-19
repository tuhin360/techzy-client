import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useProducts from "../../../hooks/useProducts";
import { FeaturedProductCard } from "../../../components/FeaturedProductCard";
import { FeaturedProductCardSkeleton } from "../../../components/FeaturedProductCardSkeleton";
import SharedTitleSection from "../../../components/SharedTitleSection/SharedTitleSection";
import { Link } from "react-router-dom";

const FeaturedProduct = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Filter featured products
  const featuredProducts = products.filter((p) => p.tags?.includes("featured"));

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) return <FeaturedProductCardSkeleton />;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!featuredProducts.length)
    return (
      <div className="text-center py-10">No featured products available.</div>
    );

  const currentProduct = featuredProducts[selectedProduct];

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Section Header */}
        <SharedTitleSection
          title="Featured"
          highlight="Products"
          subtitle="Discover our top picks with exclusive offers"
        />

        {/* Main Featured Product */}
        <FeaturedProductCard
          product={currentProduct}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />

        {/* Product Selector */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {featuredProducts.map((product, index) => (
            <button
              key={product._id}
              onClick={() => setSelectedProduct(index)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                selectedProduct === index
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              {product.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-16">
          <Link to="/shop">
            <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 shadow-lg cursor-pointer">
              <span className="text-lg">Explore All Products</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
