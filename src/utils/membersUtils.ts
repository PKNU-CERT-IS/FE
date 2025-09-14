import {
  MembersRoleCategoryType,
  membersRoleCategories,
  membersGradeCategories,
  MembersGradeCategoryType,
  MembersDataType,
} from "@/types/members";

export const getRoleBadgeStyle = (
  role: MembersRoleCategoryType | "전체" | "NONE"
) => {
  switch (role) {
    case "회장":
      return "bg-cert-red/20 text-cert-dark-red border-cert-red dark:bg-cert-red/30 dark:text-red-200 dark:border-red-400";
    case "부회장":
      return "bg-orange-100 text-orange-800 border-orange-600 dark:bg-orange-700 dark:text-orange-200 dark:border-orange-500";
    case "임원진":
      return "bg-blue-100 text-blue-800 border-blue-600 dark:bg-blue-700 dark:text-blue-200 dark:border-blue-500";
    case "관리자":
      return "bg-purple-100 text-purple-800 border-purple-600 dark:bg-purple-700 dark:text-purple-200 dark:border-purple-500";
    case "UPSOLVER":
      return "bg-green-100 text-green-800 border-green-600 dark:bg-green-700 dark:text-green-200 dark:border-green-500";
    case "PLAYER":
      return "bg-gray-100 text-gray-800 border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500";
    case "NONE":
    case "전체":
      return "bg-slate-100 text-slate-800 border-slate-400 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500";
  }
};
export const getRoleBorderStyle = (
  role: MembersRoleCategoryType | "전체" | "NONE"
) => {
  switch (role) {
    case "회장":
      return "hover:border-cert-red group-hover:border-cert-red";
    case "부회장":
      return "hover:border-orange-600 group-hover:border-orange-600";
    case "임원진":
      return "hover:border-blue-600 group-hover:border-blue-600";
    case "관리자":
      return "hover:border-purple-600 group-hover:border-purple-600";
    case "UPSOLVER":
      return "hover:border-green-600 group-hover:border-green-600";
    case "PLAYER":
      return "hover:border-gray-600 group-hover:border-gray-600";
    case "NONE":
    case "전체":
      return "hover:border-slate-400 group-hover:border-slate-400";
  }
};

// 카테고리 값 value, label 키값으로 변환
export const roleOptions = [
  { value: "", label: "전체" },
  ...membersRoleCategories.map((role) => ({
    value: role,
    label: role,
  })),
];

export const gradeOptions = [
  { value: "", label: "전체" },
  ...membersGradeCategories.map((grade) => ({
    value: grade.toString(),
    label: `${grade}`,
  })),
];

// 타입 가드 함수
export function isValidRole(role: string): role is MembersRoleCategoryType {
  return membersRoleCategories.includes(role as MembersRoleCategoryType);
}
export function isValidGrade(grade: string): grade is MembersGradeCategoryType {
  return membersGradeCategories
    .toString()
    .includes(grade as MembersGradeCategoryType);
}

// 검색 필터
const filterBySearch = (member: MembersDataType, search: string) => {
  if (search === "") return true;

  const searchLower = search.toLowerCase();
  return (
    member.name.toLowerCase().includes(searchLower) ||
    member.major.toLowerCase().includes(searchLower) ||
    member.skills?.some((skill) => skill.toLowerCase().includes(searchLower))
  );
};

// 역할 필터
const filterByRole = (
  member: MembersDataType,
  role: MembersRoleCategoryType | "전체" | "NONE"
) => {
  switch (role) {
    case "회장":
      return member.role === "회장";
    case "부회장":
      return member.role === "부회장";
    case "임원진":
      return ["회장", "부회장", "임원진"].includes(member.role);
    case "관리자":
      return member.role === "관리자";
    case "UPSOLVER":
      return member.role === "UPSOLVER";
    case "PLAYER":
      return member.role === "PLAYER";
    case "NONE":
    case "전체":
      return true; // 전체 보기 or 역할 없음 → 모든 멤버 포함
    default:
      return true;
  }
};
// 학년 필터
const filterByGrade = (
  member: MembersDataType,
  grade: MembersGradeCategoryType | "전체"
) => {
  return grade === "전체" || member.grade === grade;
};

// 통합 필터
export const filterMembers = (
  members: MembersDataType[],
  search: string,
  role: MembersRoleCategoryType | "전체",
  grade: MembersGradeCategoryType | "전체"
) => {
  return members
    .filter(
      (member) =>
        filterBySearch(member, search) &&
        filterByRole(member, role) &&
        filterByGrade(member, grade)
    )
    .sort((a, b) => {
      const roleDiff =
        membersRoleCategories.indexOf(a.role) -
        membersRoleCategories.indexOf(b.role);
      if (roleDiff !== 0) return roleDiff;

      return a.name.localeCompare(b.name, "ko-KR");
    });
};
