"use client";

import { CATEGORY_LABELS } from "@/types/category";
import { SUBCATEGORY_LABELS, SubCategoryKey } from "@/types/category";
import { STATUS_LABELS } from "@/types/progressStatus";
import { SEMESTER_LABELS } from "@/types/study";
import type { FilterKey, StudyCurrentFilters } from "@/types/study";
import { X } from "lucide-react";

interface CCStudyFilterTagProps {
  studyCurrentFilters: StudyCurrentFilters;
  updateFilter: (key: FilterKey, value: string) => void;
}

export default function CCStudyFilterTag({
  studyCurrentFilters,
  updateFilter,
}: CCStudyFilterTagProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* 검색 */}
      {studyCurrentFilters.search && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3 sm:mb-0">
          검색: {studyCurrentFilters.search}
          <button
            type="button"
            onClick={() => updateFilter("search", "")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}

      {/* 학기 */}
      {studyCurrentFilters.semester !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3 sm:mb-0">
          {SEMESTER_LABELS[studyCurrentFilters.semester]}
          <button
            type="button"
            onClick={() => updateFilter("semester", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-red-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}

      {/* 카테고리 */}
      {studyCurrentFilters.category !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
          {CATEGORY_LABELS[studyCurrentFilters.category]}
          <button
            type="button"
            onClick={() => updateFilter("category", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}

      {/* 서브 카테고리 */}
      {studyCurrentFilters.subCategory !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
          {
            SUBCATEGORY_LABELS[
              studyCurrentFilters.subCategory as SubCategoryKey
            ]
          }
          <button
            type="button"
            onClick={() => updateFilter("subCategory", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}

      {/* 상태 */}
      {studyCurrentFilters.studyStatus !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3 sm:mb-0">
          {STATUS_LABELS[studyCurrentFilters.studyStatus]}
          <button
            type="button"
            onClick={() => updateFilter("studyStatus", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
    </div>
  );
}
