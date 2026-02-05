export default function SCProfileGroupSkeleton() {
  return (
    <div className="space-y-7 animate-pulse">
      {/* 프로필 카드 */}
      <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full" />

          <div className="w-28 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded" />

          <div className="w-full space-y-3 mt-4">
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mt-4" />
        </div>
      </div>
      {/* 오늘 일정 카드 */}
      <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4">
          <div className="w-28 h-5 bg-gray-300 dark:bg-gray-600 rounded" />

          <div className="space-y-3">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
