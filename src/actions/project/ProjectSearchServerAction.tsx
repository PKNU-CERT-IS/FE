"use server";

import { redirect } from "next/navigation";
import type { SemesterType } from "@/types/project";
import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";

/**
 * 필터 적용 서버 액션 (project용)
 */
export async function applyProjectFilters(formData: FormData) {
  const search = formData.get("search") as string;
  const semester = formData.get("semester") as SemesterType;
  const category = formData.get("category") as CategoryType;
  const subCategory = formData.get("subCategory") as SubCategoryType;
  const status = formData.get("status") as StatusType;

  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("search", search.trim());
  }
  if (semester && semester !== "all") {
    params.set("semester", semester);
  }
  if (category && category !== "all") {
    params.set("category", category);
  }
  if (subCategory && subCategory !== "all") {
    params.set("subCategory", subCategory);
  }
  if (status && status !== "all") {
    params.set("status", status);
  }

  const queryString = params.toString();
  redirect(queryString ? `/project?${queryString}` : "/project");
}

/**
 * 페이지 변경 서버 액션
 */
export async function changeProjectPage(
  page: number,
  currentParams: URLSearchParams
) {
  const params = new URLSearchParams(currentParams);
  params.set("page", page.toString());
  redirect(`/project?${params.toString()}`);
}
