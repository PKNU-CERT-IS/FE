"server-only";

import CCTabBar from "@/components/profile/CCTabBar";
import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";
import CCProfilePagination from "./CCProfilePagination";
import {
  mockProfileBlogData,
  mockProfileStudyData,
} from "@/mocks/mockProfileData";

interface SCProfileContentProps {
  currentTab: string;
  searchParams: Promise<{
    tab?: string;
    page?: string;
  }>;
}

export default async function SCProfileContent({
  currentTab,
  searchParams,
}: SCProfileContentProps) {
  const { page } = await searchParams;

  const ITEMS_PER_PAGE = 5; // 페이지당 아이템 수

  const currentPage = parseInt(page || "1", 10);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredStudyData = mockProfileStudyData;
  const filteredBlogData = mockProfileBlogData;
  const paginatedStudyContents = filteredStudyData.slice(startIndex, endIndex);
  const paginatedBlogContents = filteredBlogData.slice(startIndex, endIndex);

  return (
    <div className="lg:col-span-2">
      {/* 탭 바 */}
      <CCTabBar currentTab={currentTab} />
      {/* 메인 컨텐츠 */}
      <SCStudyList
        searchParams={searchParams}
        studies={paginatedStudyContents}
      />
      <SCBlogList searchParams={searchParams} blogs={paginatedBlogContents} />

      <CCProfilePagination
        currentPage={currentPage}
        totalItems={
          currentTab === "study"
            ? filteredStudyData.length
            : filteredBlogData.length
        }
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
