"server-only";

export default function SCStudySkeleton() {
  return (
    <div className="mb-12">
      {/* 총 개수 표시 스켈레톤 */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">총</span>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            개의 학습 자료가 있습니다.
          </span>
        </div>
      </div>

      {/* 스터디 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="card-list p-6 dark-default flex flex-col animate-pulse"
          >
            {/* 상태 및 날짜 정보 스켈레톤 */}
            <div className="flex items-center gap-1 mb-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>

            {/* 제목 및 설명 스켈레톤 */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>

            {/* 카테고리 배지 스켈레톤 */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
            </div>

            {/* 첨부 파일 섹션 스켈레톤 */}
            <div className="space-y-2 mb-4 h-[100px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="flex items-center justify-between rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* 참가자 진행률 스켈레톤 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-2/3"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mt-1"></div>
            </div>

            {/* 작성자 및 참가 버튼 스켈레톤 */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 h-12">
              <div className="flex items-center gap-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
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
