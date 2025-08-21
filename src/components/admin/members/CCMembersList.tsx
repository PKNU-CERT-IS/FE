"use client";

import React, { useState } from "react";
import { membersRoleCategories } from "@/types/members";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import CCMembersRow from "@/components/admin/members/CCMembersRow";
import CCMemberDetailCard from "@/components/admin/members/CCMemberDetailCard";

interface CCMembersListProps {
  filteredMembers: AdminMemberDetailInfoType[]; // 서버에서 필터된 결과
}

export default function CCMembersList({ filteredMembers }: CCMembersListProps) {
  const [selectedMember, setSelectedMember] =
    useState<AdminMemberDetailInfoType | null>(null);

  return (
    <div className="flex gap-8 w-full">
      {/* 멤버 목록 */}
      <div className="flex-1 rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-300 flex items-center">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            전체 회원
            <span className="text-sm text-gray-500 flex items-center ml-0.5">
              ({filteredMembers.length}명)
            </span>
          </h2>
        </div>
        <div className="p-0 overflow-y-auto max-h-[40rem]">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-2">이름</th>
                <th className="px-4 py-2">전공 / 학번</th>
                <th className="px-2 py-2">활동</th>
                <th className="px-4 py-2 text-center">벌점</th>
                <th className="px-4 py-2 text-center">유예 기간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {membersRoleCategories.map((role) => {
                const sorted = filteredMembers.filter(
                  (member) => member.role === role
                );
                if (sorted.length === 0) return null;

                return (
                  <React.Fragment key={role}>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={5}
                        className="px-4 py-2 font-semibold text-gray-700"
                      >
                        {role}
                      </td>
                    </tr>
                    {sorted.map((member: AdminMemberDetailInfoType) => (
                      <CCMembersRow
                        key={member.id}
                        member={member}
                        selectedMember={selectedMember}
                        setSelectedMember={setSelectedMember}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 상세 카드 */}
      {selectedMember && (
        <CCMemberDetailCard
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      )}
    </div>
  );
}
