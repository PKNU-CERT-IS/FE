import MembersCardList from "@/components/members/SCMembersCardList";
import MembersSearchBar from "@/components/members/CCMembersSearchBar";
import MembersGradeDropdown from "@/components/members/CCMembersGradeDown";
import MembersRoleDropdown from "@/components/members/CCMembersRoleDropDown";
import { isValidRole, isValidGrade } from "@/utils/membersUtils";
import { Metadata } from "next";
import { getMembers } from "@/app/api/member/SCmemberApi";
import {
  translateKoreanToGrade,
  translateKoreanToRole,
} from "@/utils/transformRequestValue";
import { Suspense } from "react";
import SCMembersSkeleton from "@/components/members/SCMemberSkeleton";
interface MembersPageProps {
  searchParams: Promise<{
    role?: string;
    keyword?: string;
    grade?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; keyword?: string; grade?: string }>;
}): Promise<Metadata> {
  const { role, keyword, grade } = await searchParams;

  const currentRole = role && isValidRole(role) ? role : "";
  const currentGrade = grade && isValidGrade(grade) ? grade : "";

  let description = "CERT-IS 동아리의 멋진 멤버들을 소개합니다.";

  if (keyword || currentRole || currentGrade) {
    const parts = [
      keyword ? `'${keyword}' 이름` : null,
      currentGrade || null,
      currentRole || null,
    ].filter(Boolean);

    description = parts.join(", ") + " 멤버 검색 결과입니다.";
  }

  return {
    title: "CERT-IS Members",
    description,
    openGraph: {
      title: "CERT-IS Members",
      description,
      images: ["/logo.svg"],
    },
  };
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const { role, keyword, grade } = await searchParams;

  const currentRole =
    role && isValidRole(role) ? translateKoreanToRole(role) : "전체";
  const currentKeyword = keyword || "";
  const currentGrade =
    grade && isValidGrade(grade) ? translateKoreanToGrade(grade) : "전체";

  const members = await getMembers({
    role: currentRole === "전체" ? "" : currentRole,
    grade: currentGrade === "전체" ? "" : currentGrade,
    keyword: currentKeyword,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <MembersSearchBar currentKeyword={currentKeyword} />
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
          <div className="w-full sm:w-auto">
            <MembersGradeDropdown />
          </div>
          <div className="w-full sm:w-auto">
            <MembersRoleDropdown />
          </div>
        </div>
      </div>
      <Suspense
        key={JSON.stringify({ keyword, role, grade })}
        fallback={<SCMembersSkeleton />}
      >
        <MembersCardList members={members} />
      </Suspense>
    </div>
  );
}
