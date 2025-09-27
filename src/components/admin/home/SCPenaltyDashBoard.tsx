import DefaultBadge from "@/components/ui/defaultBadge";
import { AlertTriangle } from "lucide-react";
import CCPenaltyBarCharts from "@/components/admin/home/CCPenaltyCharts";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import { groupMembersByPenalty } from "@/utils/membersUtils";

export default async function SCPenaltyDashBoard() {
  const members = await getMembersForStaff();
  const membersWithHighPenalty = groupMembersByPenalty(members).twoOrMore;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="text-card-foreground card-list cursor-default">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="text-lg font-medium flex text-gray-600 items-center gap-2 leading-none tracking-tight">
            벌점 분포 현황
          </div>
          <div className="text-base text-muted-foreground">
            현재 회원들의 벌점 현황
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="h-full flex items-center justify-center ">
            <CCPenaltyBarCharts members={members} />
          </div>
        </div>
      </div>

      <div className="text-card-foreground card-list cursor-default">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-2 text-lg text-gray-600 font-medium leading-none tracking-tight ">
            <AlertTriangle className="h-5 w-5 text-cert-dark-red" />
            탈퇴 위험 회원
          </div>
          <div className="text-base text-muted-foreground">
            벌점 2점 이상 회원 목록
          </div>
        </div>
        <div>
          <div className="space-y-4 px-6 pb-6 max-h-[22rem] overflow-y-auto">
            {membersWithHighPenalty.map((member, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-cert-red/50 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {member.name}
                      </span>
                      <DefaultBadge className="bg-cert-dark-red">
                        {member.penaltyPoints}점
                      </DefaultBadge>
                    </div>
                    <p className="text-sm text-gray-600">{member.major}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
