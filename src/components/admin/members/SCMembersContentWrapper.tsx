"server-only";

import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { members } from "@/mocks/mockAdminMembersData";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import CCMembersList from "@/components/admin/members/CCMembersList";

interface SCMembersContentWrapperProps {
  currentSearch: string;
}

export default async function SCMembersContentWrapper({
  currentSearch,
}: SCMembersContentWrapperProps) {
  const sortKorean = (a: string, b: string) => a.localeCompare(b, "ko-KR");
  const sortedMembers = [...(members as AdminMemberDetailInfoType[])].sort(
    (a, b) => sortKorean(a.name, b.name)
  );

  const filteredMembers = () => {
    return sortedMembers.filter(
      (member: AdminMemberDetailInfoType) =>
        member.name.includes(currentSearch) ||
        member.major.includes(currentSearch) ||
        member.studentId.includes(currentSearch) ||
        member.currentProjects.some((project: string) =>
          project.includes(currentSearch)
        ) ||
        member.currentStudies.some((study: string) =>
          study.includes(currentSearch)
        )
    );
  };
  const filtered = filteredMembers();

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminMembers" />
      </div>
    );
  }

  // ✅ 데이터만 클라이언트로 내려서 상호작용은 거기서
  return <CCMembersList filteredMembers={filtered} />;
}
