"server-only";

import { resetFilters } from "@/actions/ResetFiltersServerAction";

interface SCSearchResultNotFoundProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showResetButton?: boolean;
  mode?:
    | "board"
    | "study"
    | "project"
    | "blog"
    | "members"
    | "adminBoard"
    | "adminStudy"
    | "adminProject"
    | "adminBlog"
    | "adminMembers";
}

export default async function SCSearchResultNotFound({
  title = "검색 결과가 없습니다",
  description = "검색 조건을 변경하거나 필터를 초기화해보세요.",
  icon,
  showResetButton = true,
  mode = "study",
}: SCSearchResultNotFoundProps) {
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

  // mode -> pathname 매핑
  const pathByMode = {
    board: "/board",
    study: "/study",
    project: "/project",
    blog: "/blog",
    members: "/members",
    adminBoard: "/admin/board",
    adminStudy: "/admin/study?tab=study",
    adminProject: "/admin/study?tab=project",
    adminBlog: "/admin/blog",
    adminMembers: "/admin/members",
  } as const;

  // ✅ bind로 pathname을 고정한 서버 액션 생성
  const resetAction = resetFilters.bind(null, pathByMode[mode]);

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4">{icon || searchIcon}</div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-200">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-6 leading-relaxed dark:text-gray-300 ">
          {description}
        </p>

        {showResetButton && (
          <div className="space-y-3">
            <form action={resetAction}>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-cert-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cert-red focus:ring-offset-2 cursor-pointer"
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

        <div className="mt-8 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
          <h4 className="text-sm font-medium text-gray-900 mb-2 dark:text-gray-200">
            검색 팁
          </h4>
          <ul className="text-xs text-gray-600 space-y-1 text-left dark:text-gray-300">
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
