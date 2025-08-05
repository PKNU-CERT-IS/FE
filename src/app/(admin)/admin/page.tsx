"server-only";

import SCActivityDashBoard from "@/components/admin/home/SCActivityDashBoard";
import SCPenaltyDashBoard from "@/components/admin/home/SCPenaltyDashBoard";
import SCSignUpList from "@/components/admin/home/SCSignUpList";
import SCTotalDashBoard from "@/components/admin/home/SCTotalDashBoard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* 제목 */}
          <div className="text-center space-y-4 mt-16">
            <h1 className="text-3xl font-semibold text-gray-900">
              동아리 관리 시스템
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              모든 동아리 활동, 회원, 통계를 한 곳에서 모니터링하고 관리하세요
            </p>
          </div>

          {/* 통계 대시보드 */}
          <SCTotalDashBoard />

          {/* 벌점 분포 + 가입 승인 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SCPenaltyDashBoard />
            </div>
            <div className="lg:col-span-1">
              <SCSignUpList />
            </div>
          </div>

          {/* 활동 요약 */}
          <SCActivityDashBoard />
        </div>
      </div>
    </div>
  );
}
