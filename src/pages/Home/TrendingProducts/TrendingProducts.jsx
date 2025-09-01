import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Heart, ShoppingCart, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import product images
import appleWatch from "../../../assets/products/trending/watch.jpg";
import canon from "../../../assets/products/trending/canon.jpg";
import headphone from "../../../assets/products/trending/headphone.jpg";
import watch1 from "../../../assets/products/watch/watch1.jpeg";
import watch4 from "../../../assets/products/watch/watch4.jpeg";
import iphone from "../../../assets/products/phone/iphone.jpg";
import watch6 from "../../../assets/products/watch/watch6.jpeg";

const products = [
  {
    id: 1,
    title: "Apple Watch Series 9",
    price: 45000,
    originalPrice: 52000,
    discount: 14,
    rating: 4.8,
    image: appleWatch,
  },
  {
    id: 2,
    title: "Canon EOS R6 Mark II",
    price: 285000,
    originalPrice: 320000,
    discount: 11,
    rating: 4.9,
    image: canon,
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    price: 42000,
    originalPrice: 48000,
    discount: 13,
    rating: 4.7,
    image: headphone,
  },
  {
    id: 4,
    title: "Apple iPhone 15 Pro",
    price: 165000,
    originalPrice: 180000,
    discount: 8,
    rating: 4.9,
    image: iphone,
  },
  {
    id: 5,
    title: "Apple Watch Ultra",
    price: 89000,
    originalPrice: 95000,
    discount: 6,
    rating: 4.8,
    image: watch1,
  },
  {
    id: 6,
    title: "Apple Watch SE",
    price: 32000,
    originalPrice: 36000,
    discount: 11,
    rating: 4.6,
    image: watch6,
  },
  {
    id: 7,
    title: "Apple Watch Series 8",
    price: 55000,
    originalPrice: 62000,
    discount: 11,
    rating: 4.7,
    image: watch4,
  },
];

const TrendingProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return `৳${price.toLocaleString("en-US")}`;
  };

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
          <p className="text-gray-600 max-w-2xl mx-auto  mt-6">
            Latest gadgets and electronics with amazing deals
          </p>
        </div>

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
          className="!pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden">
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      -{product.discount}%
                    </span>
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.includes(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Product Image (No Hover Animation) */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.discount > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        You save{" "}
                        {formatPrice(product.originalPrice - product.price)}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-3"
                    style={{
                      transition: "none !important",
                      transform: "none !important",
                    }}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingProducts;
