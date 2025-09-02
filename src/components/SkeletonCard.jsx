export const SkeletonCard = () => {
  return (
    <div className="relative bg-white rounded-xl shadow-md border border-gray-100 animate-pulse overflow-hidden">
      {/* Badge placeholder */}
      <div className="absolute top-3 left-3 w-16 h-4 bg-gray-300 rounded-full"></div>

      {/* Discount placeholder */}
      <div className="absolute top-3 right-3 w-10 h-4 bg-gray-300 rounded-full"></div>

      {/* Wishlist placeholder */}
      <div className="absolute top-12 right-3 w-6 h-6 bg-gray-300 rounded-full"></div>

      {/* Image placeholder */}
      <div className="relative h-56 bg-gray-200"></div>

      {/* Info placeholder */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-300 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};
