"server-only";

import RequestActionButtons from "@/components/ui/requestActionButtons";
import { User } from "lucide-react";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import { groupMembersWaitingForApproval } from "@/utils/membersUtils";

export default async function CCSignUpList() {
  const members = await getMembersForStaff();
  const signUpList = groupMembersWaitingForApproval(members);
  console.log("signUpList", signUpList);

  return (
    <div className="text-card-foreground card-list h-full cursor-default">
      <div className="pb-4 flex flex-col space-y-1.5 p-6">
        <div className="text-lg font-medium flex text-gray-600 items-center gap-2 leading-none tracking-tight">
          <User className="h-5 w-5 text-cert-dark-red" />
          회원가입 승인/거절
        </div>
        <div className="text-base text-muted-foreground">
          회원가입 요청 ({signUpList.length}건)
        </div>
      </div>

      <div className="space-y-4 px-6 pb-6 max-h-[22rem] overflow-y-auto">
        {signUpList.length === 0 ? (
          <p className="text-gray-500 text-center p-3">
            회원가입 신청이 없습니다.
          </p>
        ) : (
          signUpList.map((member, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:border-cert-red/50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900">
                      {member.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">학과: {member.major}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    학번: {member.studentNumber}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 w-40">
                  <RequestActionButtons
                    id={member.memberId}
                    grade={member.grade}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
