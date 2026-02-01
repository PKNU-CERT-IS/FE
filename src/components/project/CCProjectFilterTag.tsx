"use client";

import { STATUS_LABELS } from "@/types/progressStatus";
import {
  FilterKey,
  ProjectCurrentFilters,
  SEMESTER_LABELS,
} from "@/types/project";
import { X } from "lucide-react";

interface CCProjectFilterTagProps {
  projectCurrentFilters: ProjectCurrentFilters;
  updateFilter: (key: FilterKey, value: string) => void;
}

export default function CCProjectFilterTag({
  projectCurrentFilters,
  updateFilter,
}: CCProjectFilterTagProps) {
  return (
    <div className="flex flex-wrap mb-0 sm:mb-4 mt-2 sm:mt-0 gap-2">
      {projectCurrentFilters.search && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3 sm:mb-0">
          검색: {projectCurrentFilters.search}
          <button
            type="button"
            onClick={() => updateFilter("search", "")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
      {projectCurrentFilters.semester !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-3 sm:mb-0">
          {SEMESTER_LABELS[projectCurrentFilters.semester]}
          <button
            type="button"
            onClick={() => updateFilter("semester", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-red-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
      {projectCurrentFilters.category !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
          {projectCurrentFilters.category}
          <button
            type="button"
            onClick={() => updateFilter("category", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
      {projectCurrentFilters.subCategory !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3 sm:mb-0">
          {projectCurrentFilters.subCategory}
          <button
            type="button"
            onClick={() => updateFilter("subCategory", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
      {projectCurrentFilters.projectStatus !== "ALL" && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3 sm:mb-0">
          {STATUS_LABELS[projectCurrentFilters.projectStatus]}
          <button
            type="button"
            onClick={() => updateFilter("projectStatus", "ALL")}
            className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
          >
            <X className="w-3" />
          </button>
        </span>
      )}
    </div>
  );
}
