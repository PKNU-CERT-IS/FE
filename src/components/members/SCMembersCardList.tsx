import SCMembersCard from "@/components/members/SCMembersCard";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
export default function MembersCardList({
  members,
}: {
  members: AdminMemberDetailInfoType[];
}) {
  if (members.length === 0) {
    return <SCSearchResultNotFound mode="members" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <SCMembersCard key={member.id} members={member} />
      ))}
    </div>
  );
}
