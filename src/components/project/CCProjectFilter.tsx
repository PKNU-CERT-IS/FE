"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  SUBCATEGORY_LABELS,
  SUBCATEGORY_MAP,
  SubCategoryKey,
} from "@/types/category";
import {
  FilterKey,
  ProjectCurrentFilters,
  SEMESTER_LABELS,
  SEMESTER_OPTIONS,
} from "@/types/project";
import { statusToggleOptions } from "@/utils/statusOrderUtils";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown } from "lucide-react";

interface ProjectCategoryProps {
  projectCurrentFilters: ProjectCurrentFilters;
  isAdmin?: boolean;
  updateFilter: (key: FilterKey, value: string) => void;
  resetSubCategory: (newCategory: string) => void;
}

export default function CCProjectFilter({
  projectCurrentFilters,
  isAdmin = false,
  updateFilter,
  resetSubCategory,
}: ProjectCategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const [isPending, startTransition] = useTransition();

  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] =
    useState<boolean>(false);

  const semesterRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = useCallback(() => {
    setShowSemesterDropdown(false);
    setShowCategoryDropdown(false);
    setShowSubCategoryDropdown(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        semesterRef.current?.contains(target) ||
        categoryRef.current?.contains(target) ||
        subCategoryRef.current?.contains(target)
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
      <div className="flex flex-col sm:flex-row gap-3">
        {/* 필터 버튼들 */}
        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-row sm:flex-wrap">
          {/* 학기 필터 */}
          <div
            className="relative w-full sm:w-auto sm:min-w-36"
            ref={semesterRef}
          >
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
              )}
              onClick={() => {
                setShowSemesterDropdown(!showSemesterDropdown);
                setShowCategoryDropdown(false);
                setShowSubCategoryDropdown(false);
              }}
              disabled={isPending}
            >
              <span className="text-gray-700 truncate pr-1 dark:text-gray-200">
                {SEMESTER_LABELS[projectCurrentFilters.semester]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showSemesterDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {showSemesterDropdown && (
              <div className="absolute top-full mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg z-20 max-h-48 overflow-y-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                {SEMESTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100"
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
          <div
            className="relative w-full sm:w-auto sm:min-w-36"
            ref={categoryRef}
          >
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                "border-gray-300 bg-white hover:border-cert-red hover:text-cert-black hover:bg-white",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
              )}
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowSubCategoryDropdown(false);
              }}
              disabled={isPending}
            >
              <span className="text-gray-700 truncate pr-1 dark:text-gray-200">
                {CATEGORY_LABELS[projectCurrentFilters.category]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {showCategoryDropdown && (
              <div className="absolute top-full mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg z-20 max-h-48 overflow-y-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                {CATEGORY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100"
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
          <div
            className="relative w-full sm:w-auto sm:min-w-36"
            ref={subCategoryRef}
          >
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
                "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
                "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
              )}
              onClick={() => {
                setShowSubCategoryDropdown(!showSubCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowCategoryDropdown(false);
              }}
              disabled={isPending}
            >
              <span className="text-gray-700 truncate pr-1 dark:text-gray-200">
                {projectCurrentFilters.subCategory
                  ? SUBCATEGORY_LABELS[
                      projectCurrentFilters.subCategory as SubCategoryKey
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
              <div className="absolute top-full mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg z-20 max-h-48 overflow-y-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                {SUBCATEGORY_MAP[projectCurrentFilters.category].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100"
                      onClick={() => {
                        updateFilter("subCategory", option);
                        closeAllDropdowns();
                      }}
                    >
                      {SUBCATEGORY_LABELS[option as SubCategoryKey]}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
        {/* 상태 필터 */}
        {!(isAdmin && (view === "pending" || view === "end")) && (
          <div className="sm:ml-auto">
            <div className="flex w-full gap-1 rounded-lg bg-gray-100 p-1">
              {statusToggleOptions.map((option) => {
                const active =
                  projectCurrentFilters.projectStatus === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      updateFilter(
                        "projectStatus",
                        active ? "ALL" : option.value,
                      )
                    }
                    disabled={isPending}
                    className={cn(
                      "flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all  cursor-pointer",
                      active
                        ? "text-white bg-cert-red shadow"
                        : "text-gray-600 hover:bg-cert-red/80 hover:text-white",
                      isPending && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
