import MembersCardList from "@/components/members/SCMembersCardList";
import MembersSearchBar from "@/components/members/CCMembersSearchBar";
import MembersGradeDropdown from "@/components/members/CCMembersGradeDown";
import MembersRoleDropdown from "@/components/members/CCMembersRoleDropDown";
import { filterMembers } from "@/utils/membersUtils";
import { isValidRole, isValidGrade } from "@/utils/membersUtils";
import { mockMembersData } from "@/mocks/mockMembersData";

interface MembersPageProps {
  searchParams: Promise<{
    role?: string;
    search?: string;
    grade?: string;
  }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const { role, search, grade } = await searchParams;

  const currentRole = role && isValidRole(role) ? role : "전체";
  const currentSearch = search || "";
  const currentGrade = grade && isValidGrade(grade) ? grade : "전체";

  const filteredMembers = filterMembers(
    mockMembersData,
    currentSearch,
    currentRole,
    currentGrade
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <MembersSearchBar currentSearch={currentSearch} />
        <div className="flex gap-2 flex-wrap">
          <MembersGradeDropdown />
          <MembersRoleDropdown />
        </div>
      </div>

      <MembersCardList members={filteredMembers} />
    </div>
  );
}
