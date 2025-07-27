"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCategory } from "@/types/blog";

interface BlogPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  currentSearch: string;
  currentCategory: BlogCategory;
}

export default function BlogPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  currentSearch,
  currentCategory,
}: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // 페이지 설정
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    // 검색어 유지
    if (currentSearch.trim()) {
      params.set("search", currentSearch);
    } else {
      params.delete("search");
    }

    // 카테고리 유지 (전체가 아닌 경우만)
    if (currentCategory && currentCategory !== "전체") {
      params.set("category", currentCategory);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ""}`);
  };

  // 표시할 페이지 번호들 계산
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        rangeWithDots.push(i);
      }
      return rangeWithDots;
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8">
      {/* 페이지네이션 버튼들 */}
      <div className="flex justify-center items-center space-x-2 flex-wrap gap-y-2">
        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md transition-all duration-200 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          title="이전 페이지"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 페이지 번호들 */}
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500 text-sm">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center border ${
                  currentPage === page
                    ? "bg-cert-red text-white shadow-md border-cert-red"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md transition-all duration-200 ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          title="다음 페이지"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
