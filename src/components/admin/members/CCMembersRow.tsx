"use client";

import { AlertTriangle } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { penaltyGracePeriod } from "@/utils/adminPenaltyGracePeriodUtils";

interface MemberRowProps {
  member: AdminMemberDetailInfoType;
  selectedMember: AdminMemberDetailInfoType | null;
  setSelectedMember: (member: AdminMemberDetailInfoType | null) => void;
}

export default function CCMebersRow({
  member,
  selectedMember,
  setSelectedMember,
}: MemberRowProps) {
  return (
    <tr
      className={`cursor-pointer hover:bg-gray-50 ${
        selectedMember?.id === member.id ? "bg-blue-50" : ""
      }`}
      onClick={() => setSelectedMember(member)}
    >
      <td className="px-4 py-3 w-32 sm:w-40 md:w-48 lg:w-56">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{member.name}</span>
          <DefaultBadge
            variant="outline"
            className="text-xs px-1.5 py-0.5 border-gray-300"
          >
            {member.role}
          </DefaultBadge>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-gray-600 w-48 sm:w-56 md:w-64 lg:w-72">
        <div className="flex flex-col">
          <span>{member.major} / </span>
          <span>{member.studentId}</span>
        </div>
      </td>
      <td className="px-1 py-3 w-56 sm:w-64 md:w-80 lg:w-[24rem]">
        <div className="space-y-1">
          {member.currentProjects.length === 0 &&
          member.currentStudies.length === 0 ? (
            <span className="text-xs text-gray-400">활동 없음</span>
          ) : (
            <>
              {member.currentProjects.map((project: string, item: number) => (
                <div
                  key={`p-${item}`}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded inline-block mr-1 mb-1"
                >
                  🚀{" "}
                  {project.length > 12 ? project.slice(0, 12) + "..." : project}
                </div>
              ))}
              {member.currentStudies.map((study: string, item: number) => (
                <div
                  key={`s-${item}`}
                  className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded inline-block mr-1 mb-1"
                >
                  📚 {study.length > 12 ? study.slice(0, 12) + "..." : study}
                </div>
              ))}
            </>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-center w-16 sm:w-20 md:w-24">
        <div className="flex items-center justify-center">
          <span
            className={`text-sm font-medium ${
              member.penalty >= 2 ? "text-cert-red" : "text-gray-900"
            }`}
          >
            {member.penalty}점
          </span>
          {member.penalty >= 2 && (
            <AlertTriangle className="w-3 h-3 inline ml-1 text-cert-red" />
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-center text-xs text-gray-500 w-20 sm:w-24 md:w-28">
        {member.gracePeriod == null
          ? "-"
          : penaltyGracePeriod(member.gracePeriod)}
      </td>
    </tr>
  );
}
