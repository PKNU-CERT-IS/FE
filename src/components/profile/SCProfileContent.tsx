"server-only";

import CCTabBar from "@/components/profile/CCTabBar";
import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";
import CCProfilePagination from "@/components/profile/CCProfilePagination";
import { getProfileBlog } from "@/app/api/profile/SCprofileApi";

import { StudyStatusType } from "@/types/profile";
import { Suspense } from "react";
import DefaultSuspnenseComponent from "@/components/ui/CCDefaultSuspnenseComponent";
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
  const { page, tab, status } = await searchParams;
  const isStudyTab = currentTab === "study";
  const currentPage = parseInt(page || "1", 10);
  const blogs = await getProfileBlog();

  const allBlogData = blogs;

  const ITEMS_PER_PAGE = 5;

  return (
    <div className="lg:col-span-2">
      <CCTabBar currentTab={currentTab} />

      {isStudyTab && (
        <Suspense
          key={`${tab}-${status}-${page}`}
          fallback={<DefaultSuspnenseComponent />}
        >
          <SCStudyList searchParams={searchParams} />
        </Suspense>
      )}
      {!isStudyTab && (
        <>
          <Suspense
            key={`${tab}-${status}-${page}`}
            fallback={<DefaultSuspnenseComponent />}
          >
            <SCBlogList searchParams={searchParams} />
          </Suspense>

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
