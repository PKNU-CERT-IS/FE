import { StudyTabType } from "@/types/profile";

export const getStudyCategoryColor = (type: StudyTabType) => {
  switch (type) {
    case "Project":
      return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-700 dark:text-blue-200 dark:border-blue-600";
    case "Study":
      return "bg-green-50 text-green-600 border-green-200 dark:bg-green-700 dark:text-green-200 dark:border-green-600";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
  }
};

export function translateStudyProjectStatusToKorean(status: string): string {
  const statusMap: Record<string, string> = {
    READY: "준비중",
    INPROGRESS: "진행중",
    COMPLETED: "완료",
    REJECTED: "중단됨",
  };

  return statusMap[status];
}
