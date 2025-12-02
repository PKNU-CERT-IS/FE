"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FilterKey, StudyCurrentFilters } from "@/types/study";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import CCStudyFilterTag from "@/components/study/CCStudyFilterTag";
import CCStudySearchBar from "@/components/study/CCStudySearchBar";

interface StudyFilterControllerProps {
  studyCurrentFilters: StudyCurrentFilters;
  isAdmin?: boolean;
}

export default function StudyFilterController({
  studyCurrentFilters,
  isAdmin = false,
}: StudyFilterControllerProps) {
  const [searchValue, setSearchValue] = useState(
    studyCurrentFilters.search ?? "",
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const [_isPending, startTransition] = useTransition();

  const stableFilters = useMemo(() => {
    return {
      page: studyCurrentFilters.page,
      search: studyCurrentFilters.search,
      semester: studyCurrentFilters.semester,
      category: studyCurrentFilters.category,
      subCategory: studyCurrentFilters.subCategory,
      studyStatus: studyCurrentFilters.studyStatus,
    };
  }, [
    studyCurrentFilters.page,
    studyCurrentFilters.search,
    studyCurrentFilters.semester,
    studyCurrentFilters.category,
    studyCurrentFilters.subCategory,
    studyCurrentFilters.studyStatus,
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
          const tab = params.get("tab") || "study";
          params.set("tab", tab);
          router.push(`/admin/study?${params.toString()}`);
        } else {
          router.push(`/study?${params.toString()}`);
        }
      });
    },
    [searchParams, router, isAdmin],
  );

  useEffect(() => {
    setSearchValue(studyCurrentFilters.search ?? "");
  }, [studyCurrentFilters.search]);

  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <CCStudySearchBar currentSearch={searchValue} />

          <CCStudyFilter
            studyCurrentFilters={stableFilters}
            updateFilter={updateFilter}
          />
        </div>
        <CCStudyFilterTag
          studyCurrentFilters={stableFilters}
          updateFilter={updateFilter}
        />
      </div>
    </>
  );
}
