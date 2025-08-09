"server-only";

import MembersSearchBar from "@/components/members/CCMembersSearchBar";
import CCMembersList from "@/components/admin/members/CCMembersList";

interface AdminMembersProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function AdminMembersPage({
  searchParams,
}: AdminMembersProps) {
  const resolvedSearchParams = await searchParams;
  const currentSearch = resolvedSearchParams.search || "";

  return (
    <>
      <MembersSearchBar currentSearch={currentSearch} />
      <div className="flex gap-8 mt-4">
        <CCMembersList />
      </div>
    </>
  );
}
