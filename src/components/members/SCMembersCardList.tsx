import SCMembersCard from "@/components/members/SCMembersCard";
import { MembersDataType } from "@/types/members";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

interface MembersCardListProps {
  members: MembersDataType[];
}

export default function MembersCardList({ members }: MembersCardListProps) {
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
