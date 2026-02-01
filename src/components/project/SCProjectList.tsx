"server-only";

import { SUBCATEGORY_TO_EN } from "@/types/category";
import type { ProjectList } from "@/types/project";
import { parseSearchParams } from "@/utils/projectUtils";
import { STATUS_ORDER } from "@/utils/statusOrderUtils";
import { getProjects, searchProjects } from "@/app/api/project/SCProjectApi";
import CCProjectPagination from "@/components/project/CCProjectPagination";
import SCProjectContent from "@/components/project/SCProjectContent";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

interface SCProjectListProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    category?: string;
    subCategory?: string;
    projectStatus?: string;
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
      (currentFilters.projectStatus === "ALL" || !currentFilters.projectStatus);

    let data;

    if (isDefaultFilters) {
      data = await getProjects((currentFilters.page ?? 1) - 1);
    } else {
      data = await searchProjects({
        keyword: currentFilters.search,
        category: currentFilters.category,
        subcategory: SUBCATEGORY_TO_EN[currentFilters.subCategory],
        projectStatus: currentFilters.projectStatus,
        semester: currentFilters.semester,
      });
    }

    // status 기준 정렬 (진행중 → 준비중 → 완료)
    const sortedStudyMaterials: ProjectList[] = [...data.content].sort(
      (a, b) => {
        const orderA = STATUS_ORDER[a.status] || 999;
        const orderB = STATUS_ORDER[b.status] || 999;
        return orderA - orderB;
      },
    );

    const totalPages = data.totalPages;
    const currentPage = (data.number ?? 0) + 1;

    if (sortedStudyMaterials.length === 0) {
      return (
        <div className="mb-8">
          <SCSearchResultNotFound mode="project" />
        </div>
      );
    }

    return (
      <>
        <div className="mb-8">
          <SCProjectContent materials={sortedStudyMaterials} />
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
