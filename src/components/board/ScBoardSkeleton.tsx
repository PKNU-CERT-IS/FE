"server-only";

export default function SCBoardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="card-list border-gray-200 dark:bg-gray-800 dark:border-gray-700 animate-pulse"
        >
          {/* 상단 섹션: 카테고리, 배지, 날짜 */}
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <div className="flex items-center gap-3 flex-1 justify-between">
              <div className="flex items-center gap-2">
                {/* 카테고리 아이콘 */}
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                {/* 카테고리 배지 */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                {/* 공지 배지 (선택적, 일부 카드에만 표시) */}
                {i <= 2 && (
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-10"></div>
                )}
              </div>
              {/* 날짜 */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>

            {/* 제목 */}
            <div className="mt-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>

          {/* 하단 섹션: 설명, 작성자, 통계 */}
          <div className="p-6 pt-0">
            {/* 설명 (2줄) */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>

            {/* 하단 정보: 작성자, 조회수, 좋아요 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 작성자 */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="flex items-center gap-4">
                  {/* 조회수 */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-6"></div>
                  </div>
                  {/* 좋아요 */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
