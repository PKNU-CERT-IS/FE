"server-only";

import { parseSearchParams } from "@/utils/projectUtils";
import { getProjectMaterials } from "@/mocks/mockProjectData";
import type { CurrentFilters } from "@/types/project";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import SCProjectContent from "@/components/project/SCProjectContent";
import CCProjectPagination from "@/components/project/CCProjectPagination";

interface SCProjectListProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function SCProjectList({
  searchParams,
}: SCProjectListProps) {
  const ITEMS_PER_PAGE = 6;

  try {
    const resolvedSearchParams = await searchParams;
    const currentFilters: CurrentFilters =
      parseSearchParams(resolvedSearchParams);

    const projectMaterials = getProjectMaterials();

    // 필터링 로직
    const filteredMaterials = projectMaterials.filter((material) => {
      const matchesSearch =
        !currentFilters.search ||
        material.title
          .toLowerCase()
          .includes(currentFilters.search.toLowerCase()) ||
        material.description
          .toLowerCase()
          .includes(currentFilters.search.toLowerCase()) ||
        material.author
          .toLowerCase()
          .includes(currentFilters.search.toLowerCase());

      const matchesSemester =
        currentFilters.semester === "all" ||
        material.semester === currentFilters.semester;

      const matchesTechnique =
        currentFilters.technique === "all" ||
        material.hackingTechnique === currentFilters.technique;

      const matchesStatus =
        currentFilters.status === "all" ||
        material.status === currentFilters.status;

      return (
        matchesSearch && matchesSemester && matchesTechnique && matchesStatus
      );
    });

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
    const currentPage = Math.max(
      1,
      Math.min(currentFilters.page, totalPages || 1)
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMaterials = filteredMaterials.slice(startIndex, endIndex);

    // 결과가 없을 때는 서버 컴포넌트 반환
    if (currentMaterials.length === 0) {
      return (
        <div className="mb-8">
          <SCSearchResultNotFound mode="project" />
        </div>
      );
    }

    // 결과가 있을 때는 클라이언트 컴포넌트에 데이터 전달
    return (
      <>
        <div className="mb-8">
          <SCProjectContent materials={currentMaterials} />
        </div>
        {totalPages > 1 && (
          <CCProjectPagination
            currentPage={currentPage}
            totalPages={totalPages}
            currentSearch={currentFilters.search}
            currentSemester={currentFilters.semester}
            currentTechnique={currentFilters.technique}
            currentStatus={currentFilters.status}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error in SCProjectContent:", error);

    return (
      <div className="mb-8">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
        <SCSearchResultNotFound
          title="데이터를 불러올 수 없습니다"
          description="페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
          mode="project"
        />
      </div>
    );
  }
}
