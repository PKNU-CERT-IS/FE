"server-only";

import SCStudyList from "@/components/profile/SCStudyList";
import SCBlogList from "@/components/profile/SCBlogList";
import { StudyStatusType } from "@/types/profile";

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
