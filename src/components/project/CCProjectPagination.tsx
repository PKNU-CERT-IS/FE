import Link from "next/link";
import { getPageNumbers } from "@/utils/paginationUtils";
import { SemesterType, TechniqueType, StatusType } from "@/types/project";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  currentSearch: string;
  currentSemester: SemesterType;
  currentTechnique: TechniqueType;
  currentStatus: StatusType;
}

export default function ProjectPagination({
  currentPage,
  totalPages,
  currentSearch,
  currentSemester,
  currentTechnique,
  currentStatus,
}: ProjectPaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params: Record<string, string> = {};

    // 검색어가 있으면 추가
    if (currentSearch) {
      params.search = currentSearch;
    }

    // 기본값이 아닌 필터들만 URL에 포함
    if (currentSemester !== "all") {
      params.semester = currentSemester;
    }

    if (currentTechnique !== "all") {
      params.technique = currentTechnique;
    }

    if (currentStatus !== "all") {
      params.status = currentStatus;
    }

    // 1페이지가 아닌 경우에만 page 파라미터 추가
    if (page > 1) {
      params.page = page.toString();
    }

    const query = new URLSearchParams(params).toString();
    return `/project${query ? `?${query}` : ""}`;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center space-x-2 flex-wrap gap-y-2">
        {/* 이전 페이지 버튼 */}
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
            <div
              className="p-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100"
              title="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 rounded-md transition-all duration-200 text-gray-400 cursor-not-allowed"
            title="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </div>
        )}

        {/* 페이지 번호들 */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-500 text-sm"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;

          return pageNumber === currentPage ? (
            <div
              key={pageNumber}
              className="w-10 h-10 text-sm font-medium shadow-md flex items-center justify-center rounded-md bg-cert-red text-white border border-cert-red"
            >
              {pageNumber}
            </div>
          ) : (
            <Link key={pageNumber} href={createPageUrl(pageNumber)}>
              <div className="w-10 h-10 text-sm font-medium flex items-center justify-center rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-colors">
                {pageNumber}
              </div>
            </Link>
          );
        })}

        {/* 다음 페이지 버튼 */}
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            <div
              className="p-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100"
              title="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 rounded-md transition-all duration-200 text-gray-400 cursor-not-allowed"
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
