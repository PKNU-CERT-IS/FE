"server-only";

import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import CCMembersList from "@/components/admin/members/CCMembersList";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

interface SCMembersContentWrapperProps {
  currentKeyword: string;
}

export default async function SCMembersContentWrapper({
  currentKeyword,
}: SCMembersContentWrapperProps) {
  const members = await getMembersForStaff(currentKeyword);

  const sortKorean = (a: string, b: string) => a.localeCompare(b, "ko-KR");
  const sortedMembers = [...(await members)].sort((a, b) =>
    sortKorean(a.name, b.name),
  );

  const filtered = sortedMembers;

  if (filtered.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminMembers" />
      </div>
    );
  }

  return <CCMembersList filteredMembers={filtered} />;
}
