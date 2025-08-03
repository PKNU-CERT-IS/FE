import DefaultBadge from "@/components/ui/defaultBadge";
import { AlertTriangle } from "lucide-react";

const penaltyData = [
  { name: "3점", count: 5, fill: "#9E0101" },
  { name: "2점", count: 12, fill: "#DC2626" },
  { name: "1점", count: 28, fill: "#EF4444" },
];

const withdrawalList = [
  {
    name: "김철수",
    penalty: 3,
    department: "컴퓨터공학과",
    reason: "출석 부족",
  },
  {
    name: "이영희",
    penalty: 2,
    department: "소프트웨어학과",
    reason: "과제 미제출",
  },
  {
    name: "박민수",
    penalty: 2,
    department: "정보보안학과",
    reason: "지각 누적",
  },
];

export default function SCPenaltyDashBoard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="text-card-foreground card-list">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="text-lg font-medium flex text-gray-600 items-center gap-2 leading-none tracking-tight">
            벌점 분포 현황
          </div>
          <div className="text-base text-muted-foreground">
            현재 회원들의 벌점 현황
          </div>
        </div>
        <div className="p-6 pt-0">
          {/* Chart 추가 예정 */}
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">차트 영역</p>
          </div>
        </div>
      </div>

      <div className="text-card-foreground card-list">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-2 text-lg text-gray-600 font-medium leading-none tracking-tight">
            <AlertTriangle className="h-5 w-5 text-cert-dark-red" />
            탈퇴 위험 회원
          </div>
          <div className="text-base text-muted-foreground">
            벌점 2점 이상 회원 목록
          </div>
        </div>
        <div>
          <div className="space-y-4 px-6 pb-6">
            {withdrawalList.map((member, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {member.name}
                      </span>
                      <DefaultBadge className="bg-cert-dark-red">
                        {member.penalty}점
                      </DefaultBadge>
                    </div>
                    <p className="text-sm text-gray-600">{member.department}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {member.reason}
                    </p>
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
