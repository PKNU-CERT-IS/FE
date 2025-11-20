import { BlogCategory } from "@/types/blog";
import {
  CategoryType,
  SUBCATEGORY_TO_CATEGORY,
  SubCategoryType,
} from "@/types/category";
import { StatusType } from "@/types/progressStatus";

/**
  Study, Project, Blog Category Util
 */
export const getCategoryColor = (
  category: BlogCategory | CategoryType | SubCategoryType,
) => {
  // SubCategory라면 대Category로 변환
  const mainCategory: CategoryType =
    (SUBCATEGORY_TO_CATEGORY as Record<string, CategoryType>)[category] ??
    (category as CategoryType);

  switch (mainCategory) {
    case "CTF":
      return "badge-purple";
    case "RED":
      return "badge-red";
    case "CS":
      return "badge-orange";
    case "BLUE":
      return "badge-blue";
    case "GRC":
      return "badge-green";
    case "MISC":
      return "badge-sky";
    case "기타":
    default:
      return "badge-gray";
  }
};

/**
 * 상태에 따른 CSS 클래스를 반환합니다.
 * @param status - 스터디 상태
 * @returns CSS 클래스 문자열
 */
export function getStatusColor(status: StatusType): string {
  switch (status) {
    case "READY":
      return "badge-gray";
    case "INPROGRESS":
      return "badge-blue";
    case "COMPLETED":
      return "badge-green";

    default:
      return "badge-gray";
  }
}
