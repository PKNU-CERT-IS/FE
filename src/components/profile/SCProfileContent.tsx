"server-only";

import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";

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
  return (
    <div className="lg:col-span-2">
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
        </>
      )}
    </div>
  );
}
