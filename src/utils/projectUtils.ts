// utils/projectUtils.ts
import { CategoryType, SubCategoryType } from "@/types/category";
import { ProjectMaterial, CurrentFilters, SemesterType } from "@/types/project";
import { StatusType } from "@/types/progressStatus";

/**
 * URL 검색 파라미터를 CurrentFilters 타입으로 파싱하는 함수
 */
export function parseSearchParams(searchParams: {
  search?: string;

  semester?: string;
  category?: string;
  subCategory?: string;
  status?: string;
  page?: string;
}): CurrentFilters {
  return {
    search: searchParams.search || "",
    semester: (searchParams.semester as SemesterType) || "ALL",
    category: (searchParams.category as CategoryType) || "ALL",
    subCategory: (searchParams.subCategory as SubCategoryType) || "ALL",
    status: (searchParams.status as StatusType) || "ALL",
    page: parseInt(searchParams.page || "1", 10),
  };
}

/**
 * 프로젝트 데이터를 검색어와 카테고리로 필터링하는 함수
 */
export function filterProjectData(
  projects: ProjectMaterial[],
  searchTerm: string,
  category: CategoryType
): ProjectMaterial[] {
  return projects.filter((project) => {
    // 카테고리 필터링
    const categoryMatch = category === "ALL" || project.category === category;

    // 검색어 필터링 (제목, 설명, 작성자, 태그에서 검색)
    const searchMatch =
      searchTerm === "" ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectCreatorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
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
