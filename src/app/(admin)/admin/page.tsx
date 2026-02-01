"server-only";

import CCMemberByGradeCharts from "@/components/admin/home/CCMemberByGradeCharts";
import SCActivityDashBoard from "@/components/admin/home/SCActivityDashBoard";
import SCMemberByGradeDashBoard from "@/components/admin/home/SCMemberByGradeDashBoard";
import SCSignUpList from "@/components/admin/home/SCSignUpList";
import SCTotalDashBoard from "@/components/admin/home/SCTotalDashBoard";

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 mt-16">
          {/* 통계 대시보드 */}
          <SCTotalDashBoard />

          {/* 학년 분포 + 가입 승인 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SCMemberByGradeDashBoard />
            <SCSignUpList />
          </div>

          {/* 활동 요약 */}
          <SCActivityDashBoard />
        </div>
      </div>
    </div>
  );
}
