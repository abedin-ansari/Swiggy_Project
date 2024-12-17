const ShimmerCard = () => {
  return (
    <div className="h-[450px] p-4">
      <div className="relative bg-white rounded-2xl shadow-sm h-full flex flex-col animate-pulse">
        {/* Image shimmer */}
        <div className="relative h-[200px]">
          <div className="w-full h-full rounded-t-2xl bg-gray-200"></div>
          {/* Delivery time shimmer */}
          <div className="absolute bottom-2 right-2 w-20 h-6 bg-white rounded-lg"></div>
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          {/* Title shimmer */}
          <div>
            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
            {/* Cuisines shimmer */}
            <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>

            {/* Rating and discount shimmer */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
            </div>

            {/* Location shimmer */}
            <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-3"></div>
          </div>

          {/* Bottom info shimmer */}
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded-lg w-16"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-300">
      {/* Header placeholder */}
      <div className="sticky top-[64px] z-10 bg-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto py-4">
          <div className="px-4">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            </div>
            <div className="relative">
              <div className="max-w-2xl mx-auto">
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer cards grid */}
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array(15)
            .fill("")
            .map((_, index) => (
              <ShimmerCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
