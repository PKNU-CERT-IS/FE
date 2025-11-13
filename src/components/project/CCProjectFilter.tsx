"use client";

import { useState, useTransition, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import CCProjectSearchBar from "@/components/project/CCProjectSearchBar";
import {
  SEMESTER_OPTIONS,
  SEMESTER_LABELS,
  FilterKey,
  ProjectCurrentFilters,
} from "@/types/project";
import DefaultButton from "@/components/ui/defaultButton";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  CATEGORY_OPTIONS,
  SUBCATEGORY_LABELS,
  SUBCATEGORY_MAP,
  SubCategoryKey,
} from "@/types/category";
import { STATUS_FILTER_OPTIONS, STATUS_LABELS } from "@/types/progressStatus";

interface ProjectCategoryProps {
  projectCurrentFilters: ProjectCurrentFilters;
  isAdmin?: boolean;
}

export default function CCProjectFilter({
  projectCurrentFilters,
  isAdmin = false,
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
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const semesterRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const updateFilter = useCallback(
    (key: FilterKey, value: string): void => {
      const params = new URLSearchParams(searchParams);

      if (value === "ALL" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");

      startTransition(() => {
        if (isAdmin) {
          const tab = params.get("tab") || "project";
          params.set("tab", tab);
          router.push(`/admin/study?${params.toString()}`);
        } else {
          router.push(`/project?${params.toString()}`);
        }
      });
    },
    [searchParams, router, isAdmin]
  );
  // 메인카테고리에서 다른 카테고리 선택 시 서브 카테고리 리셋
  const resetSubCategory = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);

      if (newCategory === "ALL" || newCategory === "") {
        params.delete("category");
      } else {
        params.set("category", newCategory);
      }

      params.delete("subCategory");
      params.delete("page");

      startTransition(() => {
        if (isAdmin) {
          const tab = params.get("tab") || "project";
          params.set("tab", tab);
          router.push(`/admin/study?${params.toString()}`);
        } else {
          router.push(`/project?${params.toString()}`);
        }
      });
    },
    [searchParams, router, isAdmin]
  );
  const closeAllDropdowns = useCallback(() => {
    setShowSemesterDropdown(false);
    setShowCategoryDropdown(false);
    setShowSubCategoryDropdown(false);
    setShowStatusDropdown(false);
  }, []);

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
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <CCProjectSearchBar currentSearch={projectCurrentFilters.search} />

        {/* 필터 버튼들 */}
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap">
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
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
              )}
              onClick={() => {
                setShowSemesterDropdown(!showSemesterDropdown);
                setShowCategoryDropdown(false);
                setShowSubCategoryDropdown(false);
                setShowStatusDropdown(false);
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
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
              )}
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowSubCategoryDropdown(false);
                setShowStatusDropdown(false);
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
                "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
              )}
              onClick={() => {
                setShowSubCategoryDropdown(!showSubCategoryDropdown);
                setShowSemesterDropdown(false);
                setShowCategoryDropdown(false);
                setShowStatusDropdown(false);
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
                  )
                )}
              </div>
            )}
          </div>

          {/* 상태 필터 */}
          <div
            className="relative w-full sm:w-auto sm:min-w-36"
            ref={statusRef}
          >
            <DefaultButton
              variant="outline"
              size="default"
              className={cn(
                "w-full justify-between text-left font-normal transition-all duration-200",
                (isAdmin && view === "pending") || (isAdmin && view === "end")
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  : "cursor-pointer border-gray-300 bg-white hover:border-cert-red hover:text-cert-black hover:bg-white focus:border-cert-red focus:ring-2 focus:ring-cert-red/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
              )}
              disabled={
                (isAdmin && view === "pending") ||
                (isAdmin && view === "end") ||
                isPending
              }
              onClick={() => {
                if (
                  (isAdmin && view === "pending") ||
                  (isAdmin && view === "end")
                )
                  return;
                setShowStatusDropdown(!showStatusDropdown);
                setShowSemesterDropdown(false);
                setShowCategoryDropdown(false);
                setShowSubCategoryDropdown(false);
              }}
            >
              <span className="text-gray-700 truncate pr-1 dark:text-gray-200">
                {STATUS_LABELS[projectCurrentFilters.projectStatus ?? "ALL"]}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
                  showStatusDropdown ? "rotate-180" : ""
                }`}
              />
            </DefaultButton>

            {!(
              (isAdmin && view === "pending") ||
              (isAdmin && view === "end")
            ) &&
              showStatusDropdown && (
                <div className="absolute top-full mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg z-20 max-h-48 overflow-y-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 cursor-pointer first:rounded-t-lg last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white dark:hover:bg-cert-red duration-100"
                      onClick={() => {
                        updateFilter("projectStatus", option);
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

      {/* 활성 필터 태그 */}
      <div className="flex flex-wrap gap-2 mt-4">
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
    </div>
  );
}
