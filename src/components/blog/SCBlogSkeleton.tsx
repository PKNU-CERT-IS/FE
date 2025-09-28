"server-only";

export default function SCBlogSkeleton() {
  return (
    <div className="min-h-screen">
      {/* 블로그 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="card-list block overflow-hidden dark-default animate-pulse"
          >
            <div className="p-5">
              {/* 카테고리 및 날짜 스켈레톤 */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>

              {/* 제목 스켈레톤 (2줄) */}
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>

              {/* 설명 스켈레톤 (3줄) */}
              <div className="space-y-2 mb-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>

              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mb-2"></div>

              {/* 작성자 정보 스켈레톤 */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <div
                key={page}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
