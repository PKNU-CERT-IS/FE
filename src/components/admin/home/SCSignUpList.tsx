"server-only";

import { groupMembersWaitingForApproval } from "@/utils/membersUtils";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import RegisterActionButtons from "@/components/admin/members/CCRegisterActionButtons";
import { User } from "lucide-react";

export default async function CCSignUpList() {
  const members = await getMembersForStaff();
  const signUpList = groupMembersWaitingForApproval(members);

  return (
    <div className="text-card-foreground card-list dark-default h-full cursor-default">
      <div className="pb-4 flex flex-col space-y-1.5 p-6">
        <div className="text-lg font-medium flex items-center gap-2 text-gray-600 dark:text-gray-300 leading-none tracking-tight">
          <User className="h-5 w-5 text-cert-dark-red dark:text-cert-red" />
          회원가입 승인/거절
        </div>
        <div className="text-base text-muted-foreground dark:text-gray-400">
          회원가입 요청 ({signUpList.length}건)
        </div>
      </div>

      <div className="space-y-4 px-6 pb-6 max-h-[22rem] overflow-y-auto">
        {signUpList.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center p-3">
            회원가입 신청이 없습니다.
          </p>
        ) : (
          signUpList.map((member, index) => (
            <div
              key={index}
              className="
                p-4 border border-gray-200 rounded-lg 
                transition-all duration-200 
                hover:border-cert-red/50 hover:bg-red-50
                dark:border-gray-700 dark:hover:bg-cert-red/10 dark:hover:border-cert-red/40 dark:bg-gray-700
              "
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {member.name}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    학과: {member.major}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    학번: {member.studentNumber}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 w-40">
                  <RegisterActionButtons
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
