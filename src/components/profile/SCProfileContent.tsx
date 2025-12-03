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
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense
      key={JSON.stringify(resolvedSearchParams)}
      fallback={<DefaultSuspnenseComponent />}
    >
      <SCProfileContentWrapper
        currentTab={currentTab}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
