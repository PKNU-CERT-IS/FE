import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";
import { ProjectCurrentFilters } from "@/types/project";
import { SemesterType } from "@/types/study";

/**
 * URL 검색 파라미터를 CurrentFilters 타입으로 파싱하는 함수
 */
export function parseSearchParams(searchParams: {
  search?: string;

  semester?: string;
  category?: string;
  subCategory?: string;
  projectStatus?: string;
  page?: string;
}): ProjectCurrentFilters {
  return {
    search: searchParams.search || "",
    semester: (searchParams.semester as SemesterType) || "ALL",
    category: (searchParams.category as CategoryType) || "ALL",
    subCategory: (searchParams.subCategory as SubCategoryType) || "ALL",
    projectStatus: (searchParams.projectStatus as StatusType) || "ALL",
    page: parseInt(searchParams.page || "1", 10),
  };
}
