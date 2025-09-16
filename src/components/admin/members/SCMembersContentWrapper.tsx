"server-only";

import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
// import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import CCMembersList from "@/components/admin/members/CCMembersList";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";

interface SCMembersContentWrapperProps {
  currentSearch: string;
}

export default async function SCMembersContentWrapper({
  currentSearch,
}: SCMembersContentWrapperProps) {
  const members = await getMembersForStaff(currentSearch);

  const sortKorean = (a: string, b: string) => a.localeCompare(b, "ko-KR");
  const sortedMembers = [...(await members)].sort((a, b) =>
    sortKorean(a.name, b.name)
  );

  // const filteredMembers = () => {
  //   return sortedMembers.filter(
  //     (member: AdminMemberDetailInfoType) =>
  //       member.name.includes(currentSearch) ||
  //       member.major.includes(currentSearch) ||
  //       member.studentNumber.includes(currentSearch) ||
  //       member.activeProjects.some((project: string) =>
  //         project.includes(currentSearch)
  //       ) ||
  //       member.activeStudies.some((study: string) =>
  //         study.includes(currentSearch)
  //       )
  //   );
  // };
  const filtered = sortedMembers;

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
