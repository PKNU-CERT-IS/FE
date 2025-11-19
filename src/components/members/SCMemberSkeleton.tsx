"server-only";

export default function SCMembersSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div
          key={i}
          className="card-list p-6 dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full animate-pulse"
        >
          <div className="flex-1">
            {/* 프로필 영역 스켈레톤 */}
            <div className="text-center mb-4">
              {/* 프로필 이미지/아바타 */}
              <div className="relative mb-4 w-20 h-20 mx-auto rounded-full border-2 border-gray-200 dark:border-gray-600 bg-gray-200 dark:bg-gray-700"></div>

              {/* 이름 */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-24 mx-auto"></div>

              {/* 역할 배지 */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 mx-auto mb-2"></div>

              {/* 학년 및 전공 */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto"></div>
            </div>

            {/* 설명 스켈레톤 (2-3줄) */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/5 mx-auto"></div>
            </div>

            {/* 기술 스택 섹션 */}
            <div className="mb-6">
              {/* 기술 스택 제목 */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>

              {/* 기술 스택 배지들 (가변적으로 다양한 개수) */}
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: (i % 4) + 3 }, (_, index) => (
                  <div
                    key={index}
                    className={`h-5 bg-gray-200 dark:bg-gray-700 rounded ${
                      index % 3 === 0
                        ? "w-12"
                        : index % 3 === 1
                          ? "w-16"
                          : "w-10"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* 소셜 링크 영역 스켈레톤 */}
          <div className="flex justify-center gap-3 pt-4 border-t border-gray-100 mt-auto dark:border-gray-700">
            {/* 다양한 소셜 링크 아이콘들 (일부 카드에만 표시) */}
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            {i <= 8 && (
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            )}
            {i <= 5 && (
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
