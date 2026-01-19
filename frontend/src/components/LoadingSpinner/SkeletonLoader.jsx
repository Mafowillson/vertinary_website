const SkeletonLoader = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-5">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
