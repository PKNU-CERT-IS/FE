"server-only";

import SCProfileCard from "@/components/profile/SCProfileCard";
import SCProfileContent from "@/components/profile/SCProfileContent";
import SCPenaltyStatus from "@/components/profile/SCPenaltyStatus";
import SCTodaySchedule from "@/components/profile/SCTodaySchedule";
import { Metadata } from "next";

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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SCProfileCard />
            <SCPenaltyStatus />
            <SCTodaySchedule />
          </div>
          <SCProfileContent
            currentTab={currentTab}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}
