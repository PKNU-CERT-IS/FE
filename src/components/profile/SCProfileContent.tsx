"server-only";

import { Suspense } from "react";
import { StudyStatusType } from "@/types/profile";
import SCProfileContentWrapper from "@/components/profile/SCProfileContentWrapper";
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
  return (
    <Suspense
      key={JSON.stringify(searchParams)}
      fallback={<DefaultSuspnenseComponent />}
    >
      <SCProfileContentWrapper
        currentTab={currentTab}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
