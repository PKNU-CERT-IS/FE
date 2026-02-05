"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterKey, ProjectCurrentFilters } from "@/types/project";
import CCProjectFilter from "@/components/project/CCProjectFilter";
import CCProjectFilterTag from "@/components/project/CCProjectFilterTag";
import CCProjectSearchBar from "@/components/project/CCProjectSearchBar";

interface ProjectFilterControllerProps {
  projectCurrentFilters: ProjectCurrentFilters;
  isAdmin?: boolean;
}

export default function CCProjectFilterController({
  projectCurrentFilters,
  isAdmin = false,
}: ProjectFilterControllerProps) {
  const [searchValue, setSearchValue] = useState(
    projectCurrentFilters.search ?? "",
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const [_isPending, startTransition] = useTransition();

  const stableFilters = useMemo(() => {
    return {
      page: projectCurrentFilters.page,
      search: projectCurrentFilters.search,
      semester: projectCurrentFilters.semester,
      category: projectCurrentFilters.category,
      subCategory: projectCurrentFilters.subCategory,
      projectStatus: projectCurrentFilters.projectStatus,
    };
  }, [
    projectCurrentFilters.page,
    projectCurrentFilters.search,
    projectCurrentFilters.semester,
    projectCurrentFilters.category,
    projectCurrentFilters.subCategory,
    projectCurrentFilters.projectStatus,
  ]);

  const updateFilter = useCallback(
    (key: FilterKey, value: string): void => {
      const params = new URLSearchParams(searchParams);

      if (value === "ALL" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      if (key === "search") setSearchValue(value);
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
    [searchParams, router, isAdmin],
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
    [searchParams, router, isAdmin],
  );
  useEffect(() => {
    setSearchValue(projectCurrentFilters.search ?? "");
  }, [projectCurrentFilters.search]);

  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <CCProjectSearchBar currentSearch={searchValue} />

          <CCProjectFilter
            projectCurrentFilters={stableFilters}
            updateFilter={updateFilter}
            resetSubCategory={resetSubCategory}
          />
        </div>
        <CCProjectFilterTag
          projectCurrentFilters={stableFilters}
          updateFilter={updateFilter}
        />
      </div>
    </>
  );
}
