"server-only";

import CCTabBar from "@/components/profile/CCTabBar";
import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";
import CCProfilePagination from "@/components/profile/CCProfilePagination";
import {
  mockProfileBlogData,
  mockProfileStudyData,
} from "@/mocks/mockProfileData";
import { StudyStatusType } from "@/types/profile";

interface SCProfileContentProps {
  currentTab: string;
  searchParams: Promise<{
    tab?: string;
    page?: string;
    status?: StudyStatusType;
  }>;
}
export default async function SCProfileContent({
  currentTab,
  searchParams,
}: SCProfileContentProps) {
  const { page, status } = await searchParams;
  const isStudyTab = currentTab === "study";
  const currentPage = parseInt(page || "1", 10);

  const selectedStatus = status ?? "전체";

  const allStudyData = mockProfileStudyData;
  const allBlogData = mockProfileBlogData;

  let filteredStudyData = allStudyData;

  if (selectedStatus === "진행중") {
    filteredStudyData = allStudyData
      .filter((s) => s.status === "진행중")
      .slice(0, 2);
  } else if (selectedStatus === "완료") {
    filteredStudyData = allStudyData.filter((s) => s.status === "완료");
  } else if (selectedStatus === "전체") {
    filteredStudyData = allStudyData.sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status === "진행중" ? -1 : 1;
    });
  }

  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedStudyContents =
    selectedStatus === "진행중"
      ? filteredStudyData // 스터디+프로젝트 최대 2개
      : filteredStudyData.slice(startIndex, endIndex);

  const paginatedBlogContents = allBlogData.slice(startIndex, endIndex);

  return (
    <div className="lg:col-span-2">
      <CCTabBar currentTab={currentTab} />

      {isStudyTab && <SCStudyList searchParams={searchParams} />}

      {!isStudyTab && (
        <>
          <SCBlogList
            searchParams={searchParams}
            blogs={paginatedBlogContents}
          />
          <CCProfilePagination
            currentPage={currentPage}
            totalItems={allBlogData.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      )}

      {isStudyTab && selectedStatus !== "진행중" && (
        <CCProfilePagination
          currentPage={currentPage}
          totalItems={filteredStudyData.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
}
