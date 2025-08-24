"use client";

import { useState, useTransition, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import DefaultSearchBar from "@/components/ui/defaultSearchBar";
import SearchSVG from "/public/icons/search.svg";
import type { StudyFilterProps, FilterKey } from "@/types/study";
import {
  SEMESTER_OPTIONS,
  STATUS_OPTIONS,
  SEMESTER_LABELS,
  STATUS_LABELS,
} from "@/types/study";
import DefaultButton from "@/components/ui/defaultButton";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  SUBCATEGORY_LABELS,
  SUBCATEGORY_MAP,
  SubCategoryKey,
} from "@/types/category";

interface CCStudyFilterProps extends StudyFilterProps {
  isAdmin?: boolean;
}

export default function CCStudyFilter({
  currentFilters,
  isAdmin = false,
}: CCStudyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 검색 디바운스를 위한 ref
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 로컬 상태
  const [showSemesterDropdown, setShowSemesterDropdown] =
    useState<boolean>(false);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] =
    useState<boolean>(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);

  // 검색어 로컬 상태 추가
  const [searchValue, setSearchValue] = useState<string>(
    currentFilters.search || ""
  );
  // currentFilters.search가 변경될 때 로컬 상태 동기화
  useEffect(() => {
    setSearchValue(currentFilters.search || "");
  }, [currentFilters.search]);

  const semesterRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const updateFilter = useCallback(
    (key: FilterKey, value: string): void => {
      const params = new URLSearchParams(searchParams);

      if (value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // 필터 변경 시 페이지를 1로 리셋
      params.delete("page");

      startTransition(() => {
        if (isAdmin) {
          const tab = params.get("tab") || "study";
          params.set("tab", tab);
          router.push(`/admin/study?${params.toString()}`);
        } else {
          router.push(`/study?${params.toString()}`);
        }
      });
    },
    [searchParams, router, isAdmin]
  );
  // 메인카테고리에서 다른 카테고리 선택 시 서브 카테고리 리셋
  const resetSubCategory = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);

      if (newCategory === "all" || newCategory === "") {
        params.delete("category");
      } else {
        params.set("category", newCategory);
      }

      params.delete("subCategory");
      params.delete("page");

      startTransition(() => {
        if (isAdmin) {
          const tab = params.get("tab") || "study";
          params.set("tab", tab);
          router.push(`/admin/study?${params.toString()}`);
        } else {
          router.push(`/study?${params.toString()}`);
        }
      });
    },
    [searchParams, router, isAdmin]
  );

  // 검색 디바운스 처리 (개선된 버전)
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const searchTerm: string = e.target.value;
      setSearchValue(searchTerm); // 로컬 상태 업데이트
      // 이전 타이머 클리어
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // 새 타이머 설정
      searchTimeoutRef.current = setTimeout(() => {
        updateFilter("search", searchTerm);
      }, 300);
    },
    [updateFilter]
  );
  // 검색어 초기화 함수
  const handleClearSearch = useCallback(() => {
    setSearchValue(""); // 로컬 상태 초기화
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; // input value 직접 초기화
    }
    updateFilter("search", "");
  }, [updateFilter]);

  // 드롭다운 닫기 함수
  const closeAllDropdowns = useCallback(() => {
    setShowSemesterDropdown(false);
    setShowCategoryDropdown(false);
    setShowSubCategoryDropdown(false);
    setShowStatusDropdown(false);
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        semesterRef.current?.contains(target) ||
        categoryRef.current?.contains(target) ||
        subCategoryRef.current?.contains(target) ||
        statusRef.current?.contains(target)
      ) {
        return;
      }
      closeAllDropdowns();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAllDropdowns]);

  return (
    <div className="mb-1 sm:mb-4">
      {/* 검색바와 필터들을 한 줄로 배치 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* 검색바 */}
        <div className="flex-1 relative">
          <SearchSVG className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <DefaultSearchBar
            ref={searchInputRef}
            placeholder={
              isAdmin
                ? "스터디/프로젝트 제목, 설명, 작성자로 검색하세요..."
                : "스터디 제목, 설명, 작성자로 검색하세요..."
            }
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
            </div>
          )}
        </div>

        {/* 필터 버튼들 */}
        <div className="flex flex-row flex-wrap gap-3">
          {/* 학기 필터 */}
          <div className="relative sm:min-w-36 min-w-30" ref={semesterRef}>
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer ",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
              )}
              onClick={() => {
                setShowSemesterDropdown(!showSemesterDropdown);
                setShowCategoryDropdown(false);
                setShowSubCategoryDropdown(false);
                setShowStatusDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1">
                {SEMESTER_LABELS[currentFilters.semester]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showSemesterDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {showSemesterDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {SEMESTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                    onClick={() => {
                      updateFilter("semester", option);
                      closeAllDropdowns();
                    }}
                  >
                    {SEMESTER_LABELS[option]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 메인 카테고리 */}
          <div className="relative sm:min-w-36 min-w-30" ref={categoryRef}>
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
              )}
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowSubCategoryDropdown(false);
                setShowStatusDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1">
                {CATEGORY_LABELS[currentFilters.category]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {showCategoryDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {CATEGORY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                    onClick={() => {
                      resetSubCategory(option);
                      closeAllDropdowns();
                    }}
                  >
                    {CATEGORY_LABELS[option]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 서브 카테고리 */}
          <div className="relative sm:min-w-36 min-w-30" ref={subCategoryRef}>
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full max-w-36 justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
              )}
              onClick={() => {
                setShowSubCategoryDropdown(!showSubCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowCategoryDropdown(false);
                setShowStatusDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1">
                {currentFilters.subCategory
                  ? SUBCATEGORY_LABELS[
                      currentFilters.subCategory as SubCategoryKey
                    ]
                  : ""}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showSubCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>
            {showSubCategoryDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {SUBCATEGORY_MAP[currentFilters.category].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                    onClick={() => {
                      updateFilter("subCategory", option);
                      closeAllDropdowns();
                    }}
                  >
                    {SUBCATEGORY_LABELS[option as SubCategoryKey]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 상태 필터 */}
          <div className="relative sm:min-w-36 min-w-30" ref={statusRef}>
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer ",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
              )}
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowSemesterDropdown(false);
                setShowCategoryDropdown(false);
                setShowSubCategoryDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1">
                {STATUS_LABELS[currentFilters.status]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showStatusDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>
            {showStatusDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                    onClick={() => {
                      updateFilter("status", option);
                      closeAllDropdowns();
                    }}
                  >
                    {STATUS_LABELS[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 활성 필터 태그 (한국어 표시) */}
      <div className="flex flex-wrap gap-2 mt-2">
        {currentFilters.search && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3 sm:mb-0">
            검색: {currentFilters.search}
            <button
              type="button"
              onClick={handleClearSearch}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
            >
              <X className="w-3" />
            </button>
          </span>
        )}
        {currentFilters.semester !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3 sm:mb-0">
            {SEMESTER_LABELS[currentFilters.semester]}
            <button
              type="button"
              onClick={() => updateFilter("semester", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-red-200"
            >
              <X className="w-3" />
            </button>
          </span>
        )}

        {currentFilters.category !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
            {currentFilters.category}
            <button
              type="button"
              onClick={() => updateFilter("category", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
            >
              <X className="w-3" />
            </button>
          </span>
        )}

        {currentFilters.subCategory !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
            {currentFilters.subCategory}
            <button
              type="button"
              onClick={() => updateFilter("subCategory", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
            >
              <X className="w-3" />
            </button>
          </span>
        )}
        {currentFilters.status !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3 sm:mb-0">
            {STATUS_LABELS[currentFilters.status]}
            <button
              type="button"
              onClick={() => updateFilter("status", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
            >
              <X className="w-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
