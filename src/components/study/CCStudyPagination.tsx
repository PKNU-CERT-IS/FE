import Link from "next/link";
import { useMemo } from "react";
import type { StudySearchParams } from "@/types/study";
import { createPageUrl } from "@/utils/study/studyHelper";

interface CCStudyPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: StudySearchParams | null;
}

export default function CCStudyPagination({
  currentPage,
  totalPages,
  searchParams,
}: CCStudyPaginationProps) {
  const getVisiblePages = useMemo(() => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const visiblePages = getVisiblePages;

  // URL 생성 함수들을 메모이제이션
  const createSafePageUrl = useMemo(() => {
    return (page: number) => {
      try {
        return `/study${createPageUrl(page, searchParams || {})}`;
      } catch (error) {
        console.error("URL creation error:", error);
        return `/study?page=${page}`;
      }
    };
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* 이전 버튼 */}
      {currentPage > 1 && (
        <Link
          href={createSafePageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <span className="sr-only">이전 페이지</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      )}

      {/* 첫 페이지 */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href={createSafePageUrl(1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
        </>
      )}

      {/* 페이지 번호들 */}
      {visiblePages.map((page) => (
        <Link
          key={page}
          href={createSafePageUrl(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            page === currentPage
              ? "bg-primary text-white border border-primary shadow-sm"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {/* 마지막 페이지 */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-sm text-gray-500">...</span>
          )}
          <Link
            href={createSafePageUrl(totalPages)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* 다음 버튼 */}
      {currentPage < totalPages && (
        <Link
          href={createSafePageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <span className="sr-only">다음 페이지</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
