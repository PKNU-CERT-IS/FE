"server-only";

import { parseSearchParams } from "@/utils/projectUtils";
import type { ProjectList } from "@/types/project";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import SCProjectContent from "@/components/project/SCProjectContent";
import CCProjectPagination from "@/components/project/CCProjectPagination";
import { SUBCATEGORY_TO_EN } from "@/types/category";
import { getProjects, searchProjects } from "@/app/api/project/SCProjectApi";

interface SCProjectListProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    category?: string;
    subCategory?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function SCProjectList({
  searchParams,
}: SCProjectListProps) {
  try {
    const resolvedSearchParams = await searchParams;

    const currentFilters = parseSearchParams(resolvedSearchParams);

    // 분기 조건 체크
    const isDefaultFilters =
      (!currentFilters.search || currentFilters.search === "ALL") &&
      (currentFilters.category === "ALL" || !currentFilters.category) &&
      (currentFilters.subCategory === "ALL" || !currentFilters.subCategory) &&
      (currentFilters.semester === "ALL" || !currentFilters.semester) &&
      (currentFilters.status === "ALL" || !currentFilters.status);

    let data;

    if (isDefaultFilters) {
      data = await getProjects((currentFilters.page ?? 1) - 1);
    } else {
      data = await searchProjects({
        keyword: currentFilters.search,
        category: currentFilters.category,
        subcategory: SUBCATEGORY_TO_EN[currentFilters.subCategory],
        status: currentFilters.status,
        semester: currentFilters.semester,
      });
    }

    const projectMaterials: ProjectList[] = data.content;

    const totalPages = data.totalPages;
    const currentPage = (data.number ?? 0) + 1;

    if (projectMaterials.length === 0) {
      return (
        <div className="mb-8">
          <SCSearchResultNotFound mode="project" />
        </div>
      );
    }

    return (
      <>
        <div className="mb-8">
          <SCProjectContent materials={projectMaterials} />
        </div>

        {totalPages > 1 && (
          <CCProjectPagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error in SCProjectContent:", error);

    return (
      <div className="mb-8">
        <SCSearchResultNotFound
          title="데이터를 불러올 수 없습니다"
          description="페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
          mode="project"
        />
      </div>
    );
  }
}
