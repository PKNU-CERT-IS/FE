"use client";

import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import DefaultBadge from "@/components/ui/defaultBadge";

interface MemberRowProps {
  member: AdminMemberDetailInfoType;
  selectedMember: AdminMemberDetailInfoType | null;
  setSelectedMember: (member: AdminMemberDetailInfoType | null) => void;
}

export default function CCMembersRow({
  member,
  selectedMember,
  setSelectedMember,
}: MemberRowProps) {
  return (
    <tr
      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
        selectedMember?.id === member.id ? "bg-blue-50 dark:bg-gray-800" : ""
      }`}
      onClick={() => setSelectedMember(member)}
    >
      <td className="px-4 py-3">
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
      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300 ">
        <div className="flex flex-col">
          <span>
            {member.major} / {member.studentNumber}
          </span>
        </div>
      </td>
      <td className="px-1 py-3">
        <div className="space-y-1">
          {member.activeProjects.length === 0 &&
          member.activeStudies.length === 0 ? (
            <span className="text-xs text-gray-400">활동 없음</span>
          ) : (
            <>
              {member.activeProjects.map((project: string, item: number) => (
                <div
                  key={`p-${item}`}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded inline-block mr-1 mb-1"
                >
                  🚀{" "}
                  {project.length > 12 ? project.slice(0, 12) + "..." : project}
                </div>
              ))}
              {member.activeStudies.map((study: string, item: number) => (
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
    </tr>
  );
}
