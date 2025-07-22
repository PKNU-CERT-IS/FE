import type {
  CurrentFilters,
  SemesterType,
  TechniqueType,
  StatusType,
} from "@/types/project";

export function parseSearchParams(params: {
  search?: string;
  semester?: string;
  technique?: string;
  status?: string;
  page?: string;
}): CurrentFilters {
  return {
    search: params.search || "",
    semester: (params.semester as SemesterType) || "all",
    technique: (params.technique as TechniqueType) || "all",
    status: (params.status as StatusType) || "all",
    page: Math.max(1, parseInt(params.page || "1", 10)),
  };
}

export function getStatusColor(status: StatusType): string {
  switch (status) {
    case "not_started":
      return "bg-gray-100 text-gray-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 80) return "#10b981"; // green-500
  if (percentage >= 50) return "#f59e0b"; // amber-500
  if (percentage >= 25) return "#ef4444"; // red-500
  return "#6b7280"; // gray-500
}
