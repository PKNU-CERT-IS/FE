"server-only";

import { resetStudyFilters } from "@/actions/study/StudySearchServerAction";

interface SCStudySearchResultNotFoundProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showResetButton?: boolean;
}

export default async function SCStudySearchResultNotFound({
  title = "검색 결과가 없습니다",
  description = "검색 조건을 변경하거나 필터를 초기화해보세요.",
  icon,
  showResetButton = true,
}: SCStudySearchResultNotFoundProps) {
  const searchIcon = (
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* 아이콘 */}
        <div className="mb-4">{icon || searchIcon}</div>

        {/* 제목 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        {/* 설명 */}
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {description}
        </p>

        {/* 액션 버튼들 */}
        {showResetButton && (
          <div className="space-y-3">
            <form action={resetStudyFilters}>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-cert-red text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cert-red focus:ring-offset-2"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                필터 초기화
              </button>
            </form>

            <div className="text-xs text-gray-400">
              또는 다른 검색어를 시도해보세요
            </div>
          </div>
        )}

        {/* 추가 도움말 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">검색 팁</h4>
          <ul className="text-xs text-gray-600 space-y-1 text-left">
            <li>• 다른 키워드로 검색해보세요</li>
            <li>• 필터 조건을 변경해보세요</li>
            <li>• 전체 카테고리에서 검색해보세요</li>
            <li>• 맞춤법을 확인해보세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
