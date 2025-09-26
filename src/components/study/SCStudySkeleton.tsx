"server-only";

export default function SCStudySkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
        >
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
