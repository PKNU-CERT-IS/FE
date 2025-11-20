"server-only";

import { StudyStatusType } from "@/types/profile";
import SCBlogList from "@/components/profile/SCBlogList";
import SCStudyList from "@/components/profile/SCStudyList";

interface SCProfileContentWrapperProps {
  currentTab: string;
  searchParams: Promise<{
    tab?: string;
    page?: string;
    status?: StudyStatusType;
  }>;
}

export default async function SCProfileContentWrapper({
  currentTab,
  searchParams,
}: SCProfileContentWrapperProps) {
  if (currentTab === "study") {
    return <SCStudyList searchParams={searchParams} />;
  }
  return <SCBlogList searchParams={searchParams} />;
}
