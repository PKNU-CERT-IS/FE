import { BlogCategory } from "@/types/blog";
import {
  CategoryType,
  SUBCATEGORY_TO_CATEGORY,
  SubCategoryType,
} from "@/types/category";

/**
 * 카테고리별 색상 클래스를 반환하는 함수
 */
export const getCategoryColor = (
  category: BlogCategory | CategoryType | SubCategoryType
) => {
  // 만약 소카테고리라면 대카테고리로 변환
  const mainCategory = (SUBCATEGORY_TO_CATEGORY as any)[category] || category;

  switch (mainCategory) {
    case "CTF":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "RED":
      return "bg-red-50 text-red-600 border-red-200";
    case "CS":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "BLUE":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "GRC":
      return "bg-green-50 text-green-600 border-green-200";
    case "MISC":
      return "bg-sky-50 text-sky-600 border-sky-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};
