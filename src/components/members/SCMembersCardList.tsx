import {
  isValidGrade,
  isValidRole,
  sortMembersByRole,
} from "@/utils/membersUtils";
import {
  translateKoreanToGrade,
  translateKoreanToRole,
} from "@/utils/transformRequestValue";
import { getMembers } from "@/app/api/member/SCmemberApi";
import SCMembersCard from "@/components/members/SCMembersCard";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

interface MembersCardListProps {
  searchParams: {
    role?: string;
    keyword?: string;
    grade?: string;
  };
}

export default async function MembersCardList({
  searchParams,
}: MembersCardListProps) {
  const { role, keyword, grade } = searchParams;

  const currentRole =
    role && isValidRole(role) ? translateKoreanToRole(role) : "전체";

  const currentKeyword = keyword ?? "";

  const currentGrade =
    grade && isValidGrade(grade) ? translateKoreanToGrade(grade) : "전체";

  const members = await getMembers({
    role: currentRole === "전체" ? "" : currentRole,
    grade: currentGrade === "전체" ? "" : currentGrade,
    keyword: currentKeyword,
  });

  if (!members || members.length === 0) {
    return <SCSearchResultNotFound mode="members" />;
  }

  const sorted = sortMembersByRole(members);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sorted.map((member) => (
        <SCMembersCard key={member.id} members={member} />
      ))}
    </div>
  );
}
