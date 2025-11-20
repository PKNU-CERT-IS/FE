"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MainTab, SubTab } from "@/types/admin/adminStudyTab";
import { getPageNumbers } from "@/utils/paginationUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CCStudyPaginationProps {
  currentPage: number;
  totalPages: number;
  currentSearch: string;
  currentTab: MainTab;
  currentView: SubTab;
}

export default function CCStudyPagination({
  currentPage,
  totalPages,
  currentSearch,
  currentTab,
  currentView,
}: CCStudyPaginationProps) {
  // 페이지 변경 시 스크롤 제어
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (currentSearch) params.set("search", currentSearch);
    params.set("tab", currentTab);
    params.set("view", currentView);

    if (page > 1) params.set("page", String(page));

    const query = params.toString();
    return `/admin/study${query ? `?${query}` : ""}`;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center space-x-2 flex-wrap gap-y-2">
        {/* 이전 페이지 버튼 */}
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
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

        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-500 text-sm 
                dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;

          return pageNumber === currentPage ? (
            <div
              key={pageNumber}
              className="w-10 h-10 text-sm font-medium shadow-md flex items-center justify-center rounded-md 
              bg-cert-red text-white border border-cert-red dark:border-gray-700"
            >
              {pageNumber}
            </div>
          ) : (
            <Link key={pageNumber} href={createPageUrl(pageNumber)}>
              <div
                className="w-10 h-10 text-sm font-medium flex items-center justify-center rounded-md 
                border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors 
                dark-default dark:hover:bg-gray-600 dark:text-gray-500 dark:border-gray-700"
              >
                {pageNumber}
              </div>
            </Link>
          );
        })}

        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            <div
              className="p-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 
              dark:text-gray-300 dark:hover:bg-gray-700/40"
              title="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <div
            className="p-2 rounded-md transition-all duration-200 text-gray-400 cursor-not-allowed 
            dark:text-gray-600"
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
