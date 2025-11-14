"server-only";

import SCProfileContentWrapper from "@/components/profile/SCProfileContentWrapper";

import { StudyStatusType } from "@/types/profile";
import { Suspense } from "react";
import DefaultSuspnenseComponent from "@/components/ui/CCDefaultSuspnenseComponent";
interface SCProfileContentProps {
  currentTab: string;
  searchParams: {
    tab?: string;
    page?: string;
    status?: StudyStatusType;
  };
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
