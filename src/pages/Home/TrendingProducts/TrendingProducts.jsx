import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SkeletonCard } from "../../../components/SkeletonCard";
import useProducts from "../../../hooks/useProducts";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "../../../components/ProductCard";
import "./TrendingProducts.css"; //
import SharedTitleSection from "../../../components/SharedTitleSection/SharedTitleSection";
import { Link } from "react-router-dom";

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
        <SharedTitleSection
          title="Trending"
          highlight="Products"
          subtitle="Latest gadgets and electronics with amazing deals"
        />

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
          <Link to="/all-trending-products">
            <button className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-colors duration-300 shadow-lg cursor-pointer">
              <span className="text-lg">Show More</span>
              <ArrowRight className="w-6 h-6 ml-3" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
