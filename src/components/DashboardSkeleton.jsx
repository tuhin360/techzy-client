const DashboardSkeleton = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans animate-pulse">
      {/* Main Dashboard Container */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block lg:w-72 lg:min-h-screen bg-gradient-to-b from-orange-600 to-orange-800 shadow-2xl">
          <div className="p-6">
            {/* Logo Skeleton */}
            <div className="mb-8 flex items-center space-x-2">
              <div className="h-8 w-32 bg-white/20 rounded-lg"></div>
            </div>

            {/* Dashboard Navigation Skeleton */}
            <nav className="space-y-2 mb-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg"
                >
                  <div className="w-5 h-5 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/20 rounded flex-1"></div>
                </div>
              ))}
            </nav>

            {/* Divider */}
            <div className="border-t border-orange-400/30 my-6"></div>

            {/* Main Site Navigation Skeleton */}
            <nav className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg"
                >
                  <div className="w-5 h-5 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/20 rounded flex-1"></div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 w-full">
          {/* Header Skeleton */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="flex items-center space-x-3">
              <div className="h-4 w-20 bg-gray-200 rounded hidden sm:block"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </header>

          {/* Content Area Skeleton */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Page Title */}
            <div className="h-8 w-48 bg-gray-200 rounded"></div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 space-y-4"
                >
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-100">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="h-4 bg-gray-200 rounded"
                      ></div>
                    ))}
                  </div>
                  {/* Table Rows */}
                  {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-4 gap-4 py-3">
                      {[...Array(4)].map((_, colIndex) => (
                        <div
                          key={colIndex}
                          className="h-4 bg-gray-100 rounded"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around items-center p-2 z-50">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col items-center p-2 space-y-1">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-3 w-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
