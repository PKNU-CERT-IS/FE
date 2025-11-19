"server-only";

import SCMembersContentWrapper from "@/components/admin/members/SCMembersContentWrapper";
import MembersSearchBar from "@/components/members/CCMembersSearchBar";

interface AdminMembersProps {
  searchParams: Promise<{
    keyword?: string;
  }>;
}

export default async function AdminMembersPage({
  searchParams,
}: AdminMembersProps) {
  const resolvedSearchParams = await searchParams;
  const currentKeyword = resolvedSearchParams.keyword || "";

  return (
    <>
      <MembersSearchBar currentKeyword={currentKeyword} />
      <div className="flex gap-8 mt-4">
        <SCMembersContentWrapper currentKeyword={currentKeyword} />
      </div>
    </>
  );
}
