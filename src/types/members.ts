export const membersRoleCategories = [
  "회장",
  "부회장",
  "임원진",
  "스터디장",
  "회원",
] as const;

export type MembersRoleCategoryType = (typeof membersRoleCategories)[number];

// 더 많은 카테고리 추가가능
export const membersGradeCategories = ["1", "2", "3", "4"] as const;
export type MembersGradeCategoryType = (typeof membersGradeCategories)[number];

// Main members type
export interface MembersDataType {
  id: number;
  name: string;
  role: MembersRoleCategoryType;
  grade: MembersGradeCategoryType;
  major: string;
  profileImage?: string; // 프로필 이미지가 없을 수도 있으므로 선택적
  email?: string; // 이메일이 없을 수도 있으므로 선택적
  github?: string; // GitHub 링크가 없을 수도 있으므로 선택적
  skills?: string[]; // 기술 스택이 없을 수도 있으므로 선택적
  bio?: string; // 자기소개가 없을 수도 있으므로 선택적
}
