"server-only";

import CCTabBar from "@/components/profile/CCTabBar";
import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";
import CCProfilePagination from "@/components/profile/CCProfilePagination";
import { getProfileBlog } from "@/app/api/profile/SCprofileApi";

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
  const { page } = await searchParams;
  const isStudyTab = currentTab === "study";
  const currentPage = parseInt(page || "1", 10);
  const blogs = await getProfileBlog();

  const allBlogData = blogs;

  const ITEMS_PER_PAGE = 5;

  return (
    <div className="lg:col-span-2">
      <CCTabBar currentTab={currentTab} />

      {isStudyTab && <SCStudyList searchParams={searchParams} />}

      {!isStudyTab && (
        <>
          <SCBlogList searchParams={searchParams} />
          <CCProfilePagination
            currentPage={currentPage}
            totalItems={allBlogData.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}
