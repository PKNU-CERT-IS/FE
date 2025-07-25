// utils/projectUtils.ts
import {
  ProjectMaterial,
  ProjectCategoryType,
  CurrentFilters,
  SemesterType,
  TechniqueType,
  StatusType,
  PROJECT_CATEGORIES,
} from "@/types/project";

/**
 * URL 검색 파라미터를 CurrentFilters 타입으로 파싱하는 함수
 */
export function parseSearchParams(searchParams: {
  search?: string;
  category?: string;
  semester?: string;
  technique?: string;
  status?: string;
  page?: string;
}): CurrentFilters {
  // 카테고리 유효성 검증
  const isValidCategory = (
    category: string
  ): category is ProjectCategoryType => {
    return PROJECT_CATEGORIES.includes(category as ProjectCategoryType);
  };

  return {
    search: searchParams.search || "",
    category:
      searchParams.category && isValidCategory(searchParams.category)
        ? searchParams.category
        : "전체",
    semester: (searchParams.semester as SemesterType) || "all",
    technique: (searchParams.technique as TechniqueType) || "all",
    status: (searchParams.status as StatusType) || "all",
    page: parseInt(searchParams.page || "1", 10),
  };
}

/**
 * 프로젝트 데이터를 검색어와 카테고리로 필터링하는 함수
 */
export function filterProjectData(
  projects: ProjectMaterial[],
  searchTerm: string,
  category: ProjectCategoryType
): ProjectMaterial[] {
  return projects.filter((project) => {
    // 카테고리 필터링
    const categoryMatch = category === "전체" || project.category === category;

    // 검색어 필터링 (제목, 설명, 작성자, 태그에서 검색)
    const searchMatch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.customTags.some((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return categoryMatch && searchMatch;
  });
}

/**
 * 프로젝트 데이터를 페이지네이션하는 함수
 */
export function paginateProjects(
  projects: ProjectMaterial[],
  page: number,
  itemsPerPage: number
): {
  paginatedProjects: ProjectMaterial[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return {
    paginatedProjects,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * 프로젝트 상태에 따른 배지 색상을 반환하는 함수
 */
export function getStatusColor(status: StatusType): string {
  switch (status) {
    case "not_started":
      return "bg-gray-100/80 text-gray-800";
    case "in_progress":
      return "bg-blue-100/80 text-blue-800";
    case "completed":
      return "bg-green-100/80 text-green-800";
    default:
      return "bg-gray-100/80 text-gray-800";
  }
}

/**
 * 프로젝트 상태에 따른 배지 색상을 반환하는 함수 (기존 함수명 호환성)
 */
export function getStatusBadgeColor(status: string): string {
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

/**
 * 작성자 상태에 따른 배지 색상을 반환하는 함수
 */
export function getAuthorStatusBadgeColor(authorStatus: string): string {
  switch (authorStatus) {
    case "student":
      return "bg-blue-100 text-blue-800";
    case "graduate":
      return "bg-purple-100 text-purple-800";
    case "organization":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
