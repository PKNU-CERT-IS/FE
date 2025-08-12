"server-only";

import CCProjectSearchBar from "@/components/project/CCProjectSearchBar";
import SCStudyContentList from "@/components/admin/study/SCStudyContentList";
import SCProjectContentList from "@/components/admin/study/SCProjectContentList";
import CCStudyTabBar from "@/components/admin/study/CCStudyTabBar";
import {
  isValidMainTab,
  isValidSubTab,
  MainTab,
  SubTab,
} from "@/types/admin/adminStudyTab";

interface AdminStudyProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    tab?: string;
    view?: string;
  }>;
}

export default async function AdminStudyPage({
  searchParams,
}: AdminStudyProps) {
  const resolvedSearchParams = await searchParams;

  const tabParam = resolvedSearchParams.tab;
  const viewParam = resolvedSearchParams.view;
  const pageParam = resolvedSearchParams.page;

  const currentSearch = resolvedSearchParams.search || "";
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const currentTab: MainTab =
    tabParam && isValidMainTab(tabParam) ? tabParam : "study";
  const currentView: SubTab =
    viewParam && isValidSubTab(viewParam) ? viewParam : "pending";

  return (
    <div>
      {/* 서치바는 컴포넌트 하나로 만든 뒤 호출해서 사용하는 게 좋을 것 같아서 따로 브랜치 파서 통일시킬게요 */}
      <CCProjectSearchBar currentSearch={currentSearch} />
      <CCStudyTabBar currentTab={currentTab} currentView={currentView} />

      {currentTab === "study" && (
        <SCStudyContentList
          currentTab={currentTab}
          currentView={currentView}
          currentSearch={currentSearch}
          currentPage={currentPage}
        />
      )}

      {currentTab === "project" && (
        <SCProjectContentList
          currentTab={currentTab}
          currentView={currentView}
          currentSearch={currentSearch}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
