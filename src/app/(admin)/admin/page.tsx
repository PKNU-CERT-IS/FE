"server-only";

import SCActivityDashBoard from "@/components/admin/home/SCActivityDashBoard";
import SCPenaltyDashBoard from "@/components/admin/home/SCPenaltyDashBoard";
import SCSignUpList from "@/components/admin/home/SCSignUpList";
import SCTotalDashBoard from "@/components/admin/home/SCTotalDashBoard";

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 mt-16">
          {/* 통계 대시보드 */}
          <SCTotalDashBoard />

          {/* 벌점 분포 + 가입 승인 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
