import MembersSVG from "/public/icons/members.svg";
import SCMembersCard from "./SCMembersCard";
import DefaultNoneResultUi from "@/components/ui/defaultNoneResultUi";
import { MembersDataType } from "@/types/members";

interface MembersCardListProps {
  members: MembersDataType[];
}

export default function MembersCardList({ members }: MembersCardListProps) {
  if (members.length === 0) {
    return (
      <DefaultNoneResultUi
        icon={<MembersSVG className="text-cert-dark-red" />}
        title="검색 결과가 없습니다"
        description="다른 검색어나 필터를 시도해보세요."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <SCMembersCard key={member.id} members={member} />
      ))}
    </div>
  );
}
