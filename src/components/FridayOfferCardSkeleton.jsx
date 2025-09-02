export const FridayOfferCardSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto relative bg-gray-200 rounded-xl shadow-lg overflow-hidden h-48 flex flex-col justify-between p-4 animate-pulse">
      {/* Category */}
      <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
      {/* Title */}
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
      {/* Price */}
      <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
      {/* Button */}
      <div className="w-24 h-8 bg-gray-300 rounded-full"></div>
      {/* Image placeholder */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 bg-gray-300 rounded-md"></div>
    </div>
  );
};
