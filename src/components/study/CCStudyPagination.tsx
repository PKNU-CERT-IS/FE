"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { StudySearchParams } from "@/types/study";
import { createPageUrl } from "@/utils/studyHelper";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // 페이지 변경 시 스크롤 제어
  useEffect(() => {
    // 페이지 최상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0 });
  }, [currentPage]);

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
    <div className="mt-8">
      <div className="flex justify-center items-center space-x-2 flex-wrap gap-y-2">
        {/* 이전 페이지 버튼 */}
        {currentPage > 1 ? (
          <Link href={createSafePageUrl(currentPage - 1)}>
            <div
              className="p-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/40"
              title="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 rounded-md transition-all duration-200 text-gray-400 cursor-not-allowed dark:text-gray-600"
            title="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </div>
        )}

        {/* 첫 페이지 */}
        {visiblePages[0] > 1 && (
          <>
            <Link key={1} href={createSafePageUrl(1)}>
              <div className="text-sm font-medium inline-flex items-center justify-center h-9 px-3 rounded-md border border-gray-300 text-gray-600 bg-white hover:bg-cert-red hover:border-cert-red hover:text-white transition-colors min-w-[40px] dark-default dark:hover:bg-gray-600 dark:border-gray-800 dark:text-gray-500">
                1
              </div>
            </Link>
            {visiblePages[0] > 2 && (
              <span className="px-3 py-2 text-gray-500 text-sm dark:text-gray-400">
                ...
              </span>
            )}
          </>
        )}

        {/* 페이지 번호들 */}
        {visiblePages.map((page) => (
          <Link key={page} href={createSafePageUrl(page)}>
            <div
              className={`w-10 h-10 text-sm font-medium flex items-center justify-center rounded-md transition-colors border ${
                page === currentPage
                  ? "bg-cert-red text-white shadow-md border-cert-red"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100 dark-default dark:hover:bg-gray-600 dark:border-gray-700 dark:text-gray-500"
              }`}
            >
              {page}
            </div>
          </Link>
        ))}

        {/* 마지막 페이지 */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-3 py-2 text-gray-500 text-sm dark:text-gray-400">
                ...
              </span>
            )}
            <Link key={totalPages} href={createSafePageUrl(totalPages)}>
              <div className="text-sm font-medium inline-flex items-center justify-center h-9 px-3 rounded-md border border-gray-300 text-gray-600 bg-white hover:bg-cert-red hover:border-cert-red hover:text-white transition-colors min-w-[40px] dark-default dark:hover:bg-gray-600 dark:border-gray-800 dark:text-gray-500">
                {totalPages}
              </div>
            </Link>
          </>
        )}

        {/* 다음 페이지 버튼 */}
        {currentPage < totalPages ? (
          <Link href={createSafePageUrl(currentPage + 1)}>
            <div
              className="p-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/40"
              title="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 rounded-md transition-all duration-200 text-gray-400 cursor-not-allowed dark:text-gray-600"
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
