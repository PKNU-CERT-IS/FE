"server-only";

import SCProfileCard from "@/components/profile/SCProfileCard";
import SCProfileContent from "@/components/profile/SCProfileContent";
import SCPenaltyStatus from "@/components/profile/SCPenaltyStatus";

interface ProfilePageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const currentTab = (await searchParams).tab || "study";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SCProfileCard />
            {/* 활동 통계 */}
            <SCPenaltyStatus />
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
