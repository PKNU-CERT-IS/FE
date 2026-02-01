import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import CCMemberByGradeCharts from "@/components/admin/home/CCMemberByGradeCharts";

export default async function SCMemberByGradeDashBoard() {
  const members = await getMembersForStaff();

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="text-card-foreground card-list dark-default cursor-default">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="text-lg font-medium text-gray-600 dark:text-gray-300 leading-none tracking-tight">
            학년 분포 현황
          </div>
          <div className="text-base text-muted-foreground dark:text-gray-400">
            현재 회원들의 학년별 분포
          </div>
        </div>

        <div className="p-6 pt-0">
          <CCMemberByGradeCharts members={members} />
        </div>
      </div>
    </div>
  );
}
