"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { getStudyCategoryColor } from "@/utils/profileUtils";
import { StudyStatusToStatusType, StudyTabType } from "@/types/profile";
import Link from "next/link";
import CCProfileStudyStatusFilter from "@/components/profile/CCProfileStudyStatusFilter";
import CCCreateDropdown from "@/components/profile/CCCreateDropdown";
import { StudyStatusType, studyStatus } from "@/types/profile";
import { getCategoryColor } from "@/utils/badgeUtils";
import {
  mockProfileStudyData,
  mockProfileProjectData,
} from "@/mocks/mockProfileData";
import { CategoryType, SubCategoryType } from "@/types/category";

interface SCStudyListProps {
  searchParams: Promise<{
    tab?: string;
    status?: string;
  }>;
}

export default async function SCStudyList({ searchParams }: SCStudyListProps) {
  const { tab, status } = await searchParams;
  const currentTab = tab || "study";

  const selectedStatus: StudyStatusType =
    status && studyStatus.includes(status as StudyStatusType)
      ? (status as StudyStatusType)
      : "전체";

  const allMaterials = [
    ...mockProfileStudyData.map((m) => ({ ...m, tab: "Study" as const })),
    ...mockProfileProjectData.map((m) => ({ ...m, tab: "Project" as const })),
  ];

  const materialsByTab = allMaterials.filter(
    (m) => currentTab === "study" || m.tab === currentTab
  );

  let filteredMaterials =
    selectedStatus === "전체"
      ? materialsByTab
      : materialsByTab.filter(
          (m) => m.status === StudyStatusToStatusType[selectedStatus]
        );

  if (selectedStatus === "진행중") {
    filteredMaterials = filteredMaterials.slice(0, 2);
  }
  return (
    <>
      <div className="space-y-4 mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* 모바일: 제목 + 새 글 작성 버튼 */}
          <div className="flex w-full items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-200">
              내 스터디/프로젝트 목록
            </h3>
            {/* 모바일 전용 새 글 작성 버튼 */}
            <div className="sm:hidden">
              <CCCreateDropdown />
            </div>
          </div>

          {/* 모바일일 때는 아래쪽에서 왼쪽 정렬, 데스크톱은 row 정렬 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:justify-end w-full">
            {/* 카테고리 필터 */}
            <div className="w-full sm:w-auto">
              <CCProfileStudyStatusFilter selectedStatus={selectedStatus} />
            </div>
            {/* 데스크톱 전용 새 글 작성 버튼 */}
            <div className="hidden sm:block">
              <CCCreateDropdown />
            </div>
          </div>
        </div>

        {/* 필터링된 목록 출력 */}
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <div
              key={`${material.tab}-${material.id}`}
              className="card-list text-card-foreground group dark-default"
            >
              <Link
                href={`/${material.tab.toLocaleLowerCase()}/${material.id}`}
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-cert-red transition-colors cursor-pointer dark:text-gray-200">
                        {material.title}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-400">
                        <span>{material.startDate}</span>
                        <DefaultBadge
                          className={`border-gray-200 text-gray-600 ${getStudyCategoryColor(
                            material.tab as StudyTabType
                          )}`}
                        >
                          {material.tab}
                        </DefaultBadge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 flex gap-2">
                  <DefaultBadge
                    variant="custom"
                    className={getCategoryColor(
                      material.category as CategoryType
                    )}
                  >
                    {material.category}
                  </DefaultBadge>
                  <DefaultBadge
                    variant="custom"
                    className={getCategoryColor(
                      material.subCategory as SubCategoryType
                    )}
                  >
                    {material.subCategory}
                  </DefaultBadge>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8 dark:text-gray-400">
            해당 상태의 스터디/프로젝트가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
