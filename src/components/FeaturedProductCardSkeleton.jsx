export const FeaturedProductCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center animate-pulse">
      {/* Image Placeholder */}
      <div className="relative">
        <div className="h-80 sm:h-96 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Details Placeholder */}
      <div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-6"></div>
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-20 ml-2"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};