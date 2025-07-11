import {
  MembersRoleCategoryType,
  membersRoleCategories,
  membersGradeCategories,
  MembersGradeCategoryType,
  MembersDataType,
} from "@/types/members";

export const getRoleBadgeStyle = (role: MembersRoleCategoryType | "전체") => {
  switch (role) {
    case "회장":
      return "bg-cert-red/20 text-cert-dark-red border-cert-red";
    case "부회장":
      return "bg-orange-100 text-orange-800 border-orange-600";
    case "임원진":
      return "bg-blue-100 text-blue-800 border-blue-600";
    case "스터디장":
      return "bg-purple-100 text-purple-800 border-purple-600";
    default:
      return "bg-gray-100 text-gray-800 border-gray-600";
  }
};

export const getRoleBorderStyle = (role: MembersRoleCategoryType | "전체") => {
  switch (role) {
    case "회장":
      return "hover:border-cert-red group-hover:border-cert-red";
    case "부회장":
      return "hover:border-orange-600 group-hover:border-orange-600";
    case "임원진":
      return "hover:border-blue-600 group-hover:border-blue-600";
    case "스터디장":
      return "hover:border-purple-600 group-hover:border-purple-600";
    default:
      return "hover:border-gray-600 group-hover:border-gray-600";
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
    label: `${grade}학년`,
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
  role: MembersRoleCategoryType | "전체"
) => {
  switch (role) {
    case "회장":
      return member.role === "회장";
    case "부회장":
      return member.role === "부회장";
    case "임원진":
      return ["회장", "부회장", "임원진"].includes(member.role);
    case "스터디장":
      return member.role === "스터디장";
    case "회원":
      return member.role === "회원";
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
  return members.filter(
    (member) =>
      filterBySearch(member, search) &&
      filterByRole(member, role) &&
      filterByGrade(member, grade)
  );
};
