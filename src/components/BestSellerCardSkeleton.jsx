export const BestSellerCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-pulse h-[500px]">
      {/* Bestseller Badge */}
      <div className="absolute top-4 left-4 w-24 h-6 bg-gray-200 rounded-full"></div>
      {/* Category Badge */}
      <div className="absolute top-4 right-4 w-16 h-6 bg-gray-200 rounded-full"></div>
      {/* Discount Badge */}
      <div className="absolute top-16 right-4 w-12 h-5 bg-gray-200 rounded-full"></div>
      {/* Wishlist */}
      <div className="absolute top-24 right-4 w-10 h-10 bg-gray-200 rounded-full"></div>
      {/* Product Image */}
      <div className="relative h-72 bg-gray-200"></div>
      {/* Product Info */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
        </div>
        {/* Title */}
        <div className="w-full h-6 bg-gray-200 rounded mb-4"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded mb-6"></div>
        {/* Price */}
        <div className="w-1/2 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/3 h-4 bg-gray-200 rounded mb-4"></div>
        {/* Add to Cart */}
        <div className="w-full h-12 bg-gray-200 rounded-2xl mb-4"></div>
        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-300">
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
