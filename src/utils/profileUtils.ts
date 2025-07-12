import { BlogCategoryType, StudyCategoryType } from "@/types/profile";

export const getStudyCategoryColor = (type: StudyCategoryType) => {
  switch (type) {
    case "Project":
      return "bg-blue-100 text-blue-800  border-blue-200";
    case "Study":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50  text-gray-600 border-gray-200";
  }
};

export const getBlogCategoryColor = (type: BlogCategoryType) => {
  switch (type) {
    case "개발":
      return "bg-red-100 text-red-800  border-red-200";
    case "활동":
      return "bg-green-50 text-green-600 border-green-200 ";
    case "회고":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};
