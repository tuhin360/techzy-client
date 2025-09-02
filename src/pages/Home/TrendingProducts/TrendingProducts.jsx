import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SkeletonCard } from "../../../components/SkeletonCard";
import { useProducts } from "../../../hooks/useProducts";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "../../../components/ProductCard";
import "./TrendingProducts.css"; //

const TrendingProducts = () => {
  const { products, loading, error } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const trendingProducts = products.filter((p) => p.tags?.includes("trending"));

  return (
    <section className="max-w-7xl mx-auto mb-20">
      <div className="px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Trending{" "}
            <span className="text-gradient bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6">
            Latest gadgets and electronics with amazing deals
          </p>
        </div>

        {error && (
          <div className="text-center py-10 text-red-500 font-semibold">
            {error}
          </div>
        )}

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="!pb-12 relative"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : trendingProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductCard
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Explore All Button */}
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

export default TrendingProducts;
