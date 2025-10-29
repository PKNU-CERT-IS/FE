"use client";

import React, { useState } from "react";
import { membersRoleCategories } from "@/types/members";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import CCMembersRow from "@/components/admin/members/CCMembersRow";
import CCMemberDetailCard from "@/components/admin/members/CCMemberDetailCard";
import { translateMemberRole } from "@/utils/transfromResponseValue";

interface CCMembersListProps {
  filteredMembers: AdminMemberDetailInfoType[];
}

export default function CCMembersList({ filteredMembers }: CCMembersListProps) {
  const [selectedMember, setSelectedMember] =
    useState<AdminMemberDetailInfoType | null>(null);

  /** CSV로 변환 후 다운로드하는 함수 */
  const handleExportCSV = () => {
    if (filteredMembers.length === 0) {
      alert("내보낼 회원 데이터가 없습니다.");
      return;
    }

    // CSV 헤더
    const headers = [
      "이름",
      "전공",
      "학번",
      "학년",
      "생일",
      "전화번호",
      "이메일",
      "성별",
      "가입일",
      "역할",
      "활동 스터디",
      "활동 프로젝트",
      "벌점",
      "유예 기간",
    ];

    // 데이터 변환 (헤더와 매칭)
    const rows = filteredMembers.map((m) => [
      m.name ?? "",
      m.major ?? "",
      m.studentNumber ?? "",
      m.grade ?? "",
      m.birthday ?? "",
      m.phoneNumber ?? "",
      m.email ?? "",
      m.gender ?? "",
      m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "",
      translateMemberRole(m.role) ?? "",
      (m.activeStudies || []).join(", "),
      (m.activeProjects || []).join(", "),
      m.penaltyPoints ?? 0,
      m.gracePeriod ? new Date(m.gracePeriod).toLocaleDateString() : "",
    ]);

    // CSV 문자열 생성
    const csvContent = [
      headers.join(","), // 첫 줄: 헤더
      ...rows.map((r) =>
        r
          .map((v) => (typeof v === "string" && v.includes(",") ? `"${v}"` : v))
          .join(",")
      ),
    ].join("\n");

    // Blob 생성 & 다운로드
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `members_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-8 w-full">
      {/* 멤버 목록 */}
      <div className="flex-1 rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            전체 회원
            <span className="text-sm text-gray-500 flex items-center ml-0.5">
              ({filteredMembers.length}명)
            </span>
          </h2>

          {/* 🔹 CSV 내보내기 버튼 */}
          <button
            onClick={handleExportCSV}
            className="text-sm action-button px-3 py-1.5"
          >
            CSV로 내보내기
          </button>
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
                  (member) => translateMemberRole(member.role) === role
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
                        key={member.memberId}
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
