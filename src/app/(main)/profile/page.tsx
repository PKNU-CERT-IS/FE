"server-only";

import { Suspense } from "react";
import { Metadata } from "next";
import CCTabBar from "@/components/profile/CCTabBar";
import SCPenaltyStatus from "@/components/profile/SCPenaltyStatus";
import SCProfileCard from "@/components/profile/SCProfileCard";
import SCProfileContent from "@/components/profile/SCProfileContent";
import SCProfileGroupSkeleton from "@/components/profile/SCProfileGroupSkeleton";
import SCTodaySchedule from "@/components/profile/SCTodaySchedule";

interface ProfilePageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}): Promise<Metadata> {
  const { tab } = await searchParams;

  const title = tab
    ? `CERT-IS Profile - ${capitalize(tab)}`
    : "CERT-IS Profile";

  const description = tab
    ? `CERT-IS 프로필 페이지의 ${capitalize(tab)}입니다.`
    : "CERT-IS 멤버 프로필 페이지입니다.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/logo.svg"],
    },
  };
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const currentTab = (await searchParams).tab || "study";

  return (
    <div className="min-h-screentransition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<SCProfileGroupSkeleton />}>
              <SCProfileCard />
              <SCPenaltyStatus />
              <SCTodaySchedule />
            </Suspense>
          </div>
          <div className="lg:col-span-2">
            <CCTabBar currentTab={currentTab} />

            <SCProfileContent
              currentTab={currentTab}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
