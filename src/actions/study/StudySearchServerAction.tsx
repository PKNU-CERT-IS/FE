"use server";

import { redirect } from "next/navigation";
import type { SemesterType, TechniqueType, StatusType } from "@/types/study";

/**
 * 필터 적용 서버 액션
 */
export async function applyFilters(formData: FormData) {
  const search = formData.get("search") as string;
  const semester = formData.get("semester") as SemesterType;
  const technique = formData.get("technique") as TechniqueType;
  const status = formData.get("status") as StatusType;

  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("search", search.trim());
  }
  if (semester && semester !== "all") {
    params.set("semester", semester);
  }
  if (technique && technique !== "all") {
    params.set("technique", technique);
  }
  if (status && status !== "all") {
    params.set("status", status);
  }

  const queryString = params.toString();
  redirect(queryString ? `/study?${queryString}` : "/study");
}

/**
 * 페이지 변경 서버 액션
 */
export async function changePage(page: number, currentParams: URLSearchParams) {
  const params = new URLSearchParams(currentParams);
  params.set("page", page.toString());
  redirect(`/study?${params.toString()}`);
}
