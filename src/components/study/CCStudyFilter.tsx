"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import DefaultSearchBar from "@/components/ui/defaultSearchBar";
import SearchSVG from "/public/icons/search.svg";
import { useEffect } from "react";

import type { StudyFilterProps, FilterKey } from "@/types/study";
import {
  SEMESTER_OPTIONS,
  TECHNIQUE_OPTIONS,
  STATUS_OPTIONS,
  SEMESTER_LABELS,
  TECHNIQUE_LABELS,
  STATUS_LABELS,
} from "@/types/study";
import DefaultButton from "@/components/ui/defaultButton";
import { cn } from "@/lib/utils";

export default function CCStudyFilter({ currentFilters }: StudyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 검색 디바운스를 위한 ref
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 로컬 상태
  const [showSemesterDropdown, setShowSemesterDropdown] =
    useState<boolean>(false);
  const [showTechniqueDropdown, setShowTechniqueDropdown] =
    useState<boolean>(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);

  const semesterRef = useRef<HTMLDivElement>(null);
  const techniqueRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // URL 파라미터 업데이트 함수 (영어 값으로 저장)
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
        router.push(`/study?${params.toString()}`);
      });
    },
    [searchParams, router]
  );

  // 검색 디바운스 처리 (개선된 버전)
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const searchTerm: string = e.target.value;

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

  // 드롭다운 닫기 함수
  const closeAllDropdowns = useCallback(() => {
    setShowSemesterDropdown(false);
    setShowTechniqueDropdown(false);
    setShowStatusDropdown(false);
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        semesterRef.current?.contains(target) ||
        techniqueRef.current?.contains(target) ||
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
            placeholder="스터디 제목, 설명, 작성자로 검색하세요..."
            defaultValue={currentFilters.search}
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
                setShowTechniqueDropdown(false);
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

          {/* 기법 필터 */}
          <div className="relative sm:min-w-36 min-w-30" ref={techniqueRef}>
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer ",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20"
              )}
              onClick={() => {
                setShowTechniqueDropdown(!showTechniqueDropdown);
                setShowSemesterDropdown(false);
                setShowStatusDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1">
                {TECHNIQUE_LABELS[currentFilters.technique]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showTechniqueDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {showTechniqueDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                {TECHNIQUE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:first:rounded-md hover:rounded-md"
                    onClick={() => {
                      updateFilter("technique", option);
                      closeAllDropdowns();
                    }}
                  >
                    {TECHNIQUE_LABELS[option]}
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
                setShowTechniqueDropdown(false);
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
              onClick={() => updateFilter("search", "")}
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
        {currentFilters.technique !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
            {TECHNIQUE_LABELS[currentFilters.technique]}
            <button
              type="button"
              onClick={() => updateFilter("technique", "all")}
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
