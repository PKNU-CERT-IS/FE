"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, Plus } from "lucide-react";
import type {
  StudyFilterProps,
  FilterKey,
  SemesterType,
  TechniqueType,
  StatusType,
} from "@/types/study";
import {
  SEMESTER_OPTIONS,
  TECHNIQUE_OPTIONS,
  STATUS_OPTIONS,
  SEMESTER_LABELS,
  TECHNIQUE_LABELS,
  STATUS_LABELS,
} from "@/types/study";

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

  return (
    <div className="mb-4">
      {/* 검색바 */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="제목, 내용, 작성자로 검색..."
            defaultValue={currentFilters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* 필터 그리드 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* 학기별 필터 */}
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-red-500 transition-colors text-sm"
            onClick={() => {
              setShowSemesterDropdown(!showSemesterDropdown);
              setShowTechniqueDropdown(false);
              setShowStatusDropdown(false);
            }}
          >
            <span className="text-gray-700 truncate pr-1">
              {SEMESTER_LABELS[currentFilters.semester]}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
          {showSemesterDropdown && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {SEMESTER_OPTIONS.map((option: SemesterType) => (
                <button
                  key={option}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm"
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
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-red-500 transition-colors text-sm"
            onClick={() => {
              setShowTechniqueDropdown(!showTechniqueDropdown);
              setShowSemesterDropdown(false);
              setShowStatusDropdown(false);
            }}
          >
            <span className="text-gray-700 truncate pr-1">
              {TECHNIQUE_LABELS[currentFilters.technique]}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
          {showTechniqueDropdown && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {TECHNIQUE_OPTIONS.map((option: TechniqueType) => (
                <button
                  key={option}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm"
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
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-red-500 transition-colors text-sm"
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              setShowSemesterDropdown(false);
              setShowTechniqueDropdown(false);
            }}
          >
            <span className="text-gray-700 truncate pr-1">
              {STATUS_LABELS[currentFilters.status]}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {STATUS_OPTIONS.map((option: StatusType) => (
                <button
                  key={option}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900 first:rounded-t-lg last:rounded-b-lg text-sm"
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

        {/* 스터디 생성 버튼 */}
        <button
          type="button"
          className="w-full px-3 py-3 bg-[#4B5563] text-white rounded-lg hover:bg-[#374151] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>프로젝트 생성</span>
        </button>
      </div>

      {/* 활성 필터 태그 (한국어 표시) */}
      <div className="flex flex-wrap gap-2 mt-2">
        {currentFilters.search && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            검색: {currentFilters.search}
            <button
              type="button"
              onClick={() => updateFilter("search", "")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
            >
              ×
            </button>
          </span>
        )}
        {currentFilters.semester !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {SEMESTER_LABELS[currentFilters.semester]}
            <button
              type="button"
              onClick={() => updateFilter("semester", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-red-200"
            >
              ×
            </button>
          </span>
        )}
        {currentFilters.technique !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {TECHNIQUE_LABELS[currentFilters.technique]}
            <button
              type="button"
              onClick={() => updateFilter("technique", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
            >
              ×
            </button>
          </span>
        )}
        {currentFilters.status !== "all" && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {STATUS_LABELS[currentFilters.status]}
            <button
              type="button"
              onClick={() => updateFilter("status", "all")}
              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
