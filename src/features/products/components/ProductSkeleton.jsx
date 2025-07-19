const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-300"></div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Price and rating skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
