"server-only";

import SCStudyContentList from "@/components/admin/study/SCStudyContentList";
import SCProjectContentList from "@/components/admin/study/SCProjectContentList";
import CCStudyTabBar from "@/components/admin/study/CCStudyTabBar";
import {
  isValidMainTab,
  isValidSubTab,
  MainTab,
  SubTab,
} from "@/types/admin/adminStudyTab";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import { parseSearchParams } from "@/utils/studyHelper";
import CCProjectFilter from "@/components/project/CCProjectFilter";

interface AdminStudyProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    tab?: string;
    view?: string;
    category?: string;
    subCategory?: string;
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
    viewParam && isValidSubTab(viewParam) ? viewParam : "list";

  const baseFilters = parseSearchParams(resolvedSearchParams);

  const studyFilters = {
    ...baseFilters,
    studyStatus: baseFilters.studyStatus,
  };
  const projectFilters = {
    ...baseFilters,
    projectStatus: baseFilters.projectStatus,
  };

  return (
    <div>
      {currentTab === "study" && (
        <CCStudyFilter studyCurrentFilters={studyFilters} isAdmin />
      )}

      {currentTab === "project" && (
        <CCProjectFilter projectCurrentFilters={projectFilters} isAdmin />
      )}

      <CCStudyTabBar currentTab={currentTab} currentView={currentView} />

      {currentTab === "study" && (
        <SCStudyContentList
          currentTab={currentTab}
          currentView={currentView}
          currentSearch={currentSearch}
          currentPage={currentPage}
          studyCurrentFilters={studyFilters}
        />
      )}

      {currentTab === "project" && (
        <SCProjectContentList
          currentTab={currentTab}
          currentView={currentView}
          currentSearch={currentSearch}
          currentPage={currentPage}
          projectCurrentFilters={projectFilters}
        />
      )}
    </div>
  );
}
