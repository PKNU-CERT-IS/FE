"server-only";

import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
// import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import CCMembersList from "@/components/admin/members/CCMembersList";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";

interface SCMembersContentWrapperProps {
  currentKeyword: string;
}

export default async function SCMembersContentWrapper({
  currentKeyword,
}: SCMembersContentWrapperProps) {
  const members = await getMembersForStaff(currentKeyword);

  const sortKorean = (a: string, b: string) => a.localeCompare(b, "ko-KR");
  const sortedMembers = [...(await members)].sort((a, b) =>
    sortKorean(a.name, b.name)
  );

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
