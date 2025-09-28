"server-only";

export default function SCProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="card-list overflow-hidden flex flex-col dark-default animate-pulse"
        >
          {/* 이미지 영역 스켈레톤 */}
          <div className="relative h-76 bg-gray-200 dark:bg-gray-700">
            {/* 상태 배지 스켈레톤 */}
            <div className="absolute top-4 left-4">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
            </div>
          </div>

          {/* 본문 스켈레톤 */}
          <div className="p-6 flex flex-col flex-1">
            {/* 날짜 정보 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>

            {/* 제목 */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>

            {/* 설명 (2줄) */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>

            {/* 카테고리 배지들 */}
            <div className="flex flex-wrap gap-2 mb-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
            </div>
          </div>

          {/* 참가자 진행률 스켈레톤 */}
          <div className="mb-4 px-6">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-2/3"></div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mt-1"></div>
          </div>

          {/* 하단 바 (작성자 & 링크/버튼) 스켈레톤 */}
          <div className="flex items-center justify-between px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>

            <div className="flex items-center gap-2">
              {/* GitHub & Demo 링크 (선택적으로 일부에만 표시) */}
              {i <= 4 && (
                <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              )}
              {i <= 3 && (
                <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              )}
              {/* 참가하기 버튼 */}
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 스켈레톤 */}
      <div className="col-span-full flex justify-center mt-8">
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
