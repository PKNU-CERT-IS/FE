import { StudyTabType } from "@/types/profile";

export const getStudyCategoryColor = (type: StudyTabType) => {
  switch (type) {
    case "Project":
      return "bg-blue-100 text-blue-800  border-blue-200";
    case "Study":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50  text-gray-600 border-gray-200";
  }
};
