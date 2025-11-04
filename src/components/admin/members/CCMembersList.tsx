"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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

  // CSV 내보내기
  const handleExportCSV = () => {
    if (filteredMembers.length === 0) {
      alert("내보낼 회원 데이터가 없습니다.");
      return;
    }

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

    const csvContent = [
      headers.join(","),
      ...rows.map((r) =>
        r
          .map((v) => (typeof v === "string" && v.includes(",") ? `"${v}"` : v))
          .join(",")
      ),
    ].join("\n");

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

  // XLSX / XLS 내보내기
  const handleExportExcel = (type: "xlsx" | "xls") => {
    if (filteredMembers.length === 0) {
      alert("내보낼 회원 데이터가 없습니다.");
      return;
    }

    const worksheetData = filteredMembers.map((m) => ({
      이름: m.name ?? "",
      전공: m.major ?? "",
      학번: m.studentNumber ?? "",
      학년: m.grade ?? "",
      생일: m.birthday ?? "",
      전화번호: m.phoneNumber ?? "",
      이메일: m.email ?? "",
      성별: m.gender ?? "",
      가입일: m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "",
      역할: translateMemberRole(m.role) ?? "",
      "활동 스터디": (m.activeStudies || []).join(", "),
      "활동 프로젝트": (m.activeProjects || []).join(", "),
      벌점: m.penaltyPoints ?? 0,
      "유예 기간": m.gracePeriod
        ? new Date(m.gracePeriod).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "회원 목록");

    const excelBuffer = XLSX.write(workbook, {
      bookType: type,
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        type === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/vnd.ms-excel",
    });

    saveAs(blob, `members_${new Date().toISOString().slice(0, 10)}.${type}`);
  };

  return (
    <div className="flex gap-8 w-full">
      <div className="flex-1 rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            전체 회원
            <span className="text-sm text-gray-500 ml-1">
              ({filteredMembers.length}명)
            </span>
          </h2>

          {/* 추출 버튼*/}
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="text-sm action-button px-3 py-1.5"
            >
              CSV
            </button>
            <button
              onClick={() => handleExportExcel("xls")}
              className="text-sm action-button px-3 py-1.5"
            >
              XLS
            </button>
            <button
              onClick={() => handleExportExcel("xlsx")}
              className="text-sm action-button px-3 py-1.5"
            >
              XLSX
            </button>
          </div>
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
                    {sorted.map((member) => (
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

      {selectedMember && (
        <CCMemberDetailCard
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      )}
    </div>
  );
}
