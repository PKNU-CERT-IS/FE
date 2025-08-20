"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { getStudyCategoryColor } from "@/utils/profileUtils";
import { StudyStatusToStatusType, StudyTabType } from "@/types/profile";
import Link from "next/link";
import CCProfileStudyStatusFilter from "@/components/profile/CCProfileStudyStatusFilter";
import CCCreateDropdown from "@/components/profile/CCCreateDropdown";
import { StudyStatusType, studyStatus } from "@/types/profile";
import { getCategoryColor } from "@/utils/categoryColorUtils";
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
        <div className="flex items-center justify-between flex-wrap gap-2 sm:flex-row">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
            내 스터디/프로젝트 목록
          </h3>

          <div className="flex flex-row items-center gap-4 sm:justify-between justify-center">
            <CCProfileStudyStatusFilter selectedStatus={selectedStatus} />
            {/* 새 자료 생성 버튼 -> 드롭다운 통해서 스터디/프로젝트 선택 */}
            <CCCreateDropdown />
          </div>
        </div>

        {/* ✅ 필터링된 목록 출력 */}
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <div
              key={`${material.tab}-${material.id}`}
              className="card-list text-card-foreground group"
            >
              <Link
                href={`/${material.tab.toLocaleLowerCase()}/${material.id}`}
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                        {material.title}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 transition-colors duration-300">
                        <span>{material.startDate}</span>
                        <DefaultBadge
                          className={`border-gray-200 text-gray-600 cursor-default
                          ${getStudyCategoryColor(
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
                    className={`border-gray-200 text-gray-600 cursor-default
                          ${getCategoryColor(
                            material.category as CategoryType
                          )}`}
                  >
                    {material.category}
                  </DefaultBadge>
                  <DefaultBadge
                    className={`border-gray-200 text-gray-600 cursor-default
                          ${getCategoryColor(
                            material.subCategory as SubCategoryType
                          )}`}
                  >
                    {material.subCategory}
                  </DefaultBadge>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            해당 상태의 스터디/프로젝트가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
