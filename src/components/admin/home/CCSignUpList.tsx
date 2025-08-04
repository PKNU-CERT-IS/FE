"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { SignUpList } from "@/types/admin/adminDashBoard";
import { CheckCircle, User, XCircle } from "lucide-react";

const signUpList: SignUpList[] = [
  {
    name: "김철수",
    department: "컴퓨터공학과",
    studentId: 20212334,
  },
  {
    name: "강민수",
    department: "소프트웨어학과",
    studentId: 20212334,
  },
  {
    name: "박민수",
    department: "정보보안학과",
    studentId: 20212334,
  },
  {
    name: "박민수",
    department: "정보보안학과",
    studentId: 20212334,
  },
];

export default function CCSignUpList() {
  const handleApprove = () => {
    console.log("승인");
  };

  const handleReject = () => {
    console.log("거절");
  };

  return (
    <div className="text-card-foreground card-list h-full">
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
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-900">
                      {member.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    학과: {member.department}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    학번: {member.studentId}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 mt-1">
                  <DefaultButton
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 cursor-pointer"
                    onClick={handleApprove}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    승인
                  </DefaultButton>
                  <DefaultButton
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-cert-red hover:bg-red-50 hover:text-cert-red text-xs h-7 cursor-pointer"
                    onClick={handleReject}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    거절
                  </DefaultButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
