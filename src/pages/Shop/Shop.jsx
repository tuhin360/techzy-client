import { Helmet } from "react-helmet-async";
import { ProductCard } from "../../components/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard";
import useProducts from "../../hooks/useProducts";
import { ArrowRight } from "lucide-react";
import SharedTitleSection from "../../components/SharedTitleSection/SharedTitleSection";

export const Shop = () => {
  const { products, loading, error } = useProducts();

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>

          <div className="text-center mt-16">
            <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 shadow-lg cursor-pointer">
              <span className="text-lg">Back to Home</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
