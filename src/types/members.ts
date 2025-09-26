export const membersRoleCategories = [
  "관리자",
  "회장",
  "부회장",
  "임원진",
  "UPSOLVER",
  "PLAYER",
  "NONE",
] as const;

export type MembersRoleCategoryType = (typeof membersRoleCategories)[number];

// 더 많은 카테고리 추가가능
export const membersGradeCategories = [
  "1학년",
  "2학년",
  "3학년",
  "4학년",
  "졸업생",
  "휴학생",
] as const;

export type MembersGradeCategoryType =
  | (typeof membersGradeCategories)[number]
  | "";

// Main members type
export interface MembersDataType {
  id: number;
  name: string;
  memberRole: MembersRoleCategoryType;
  memberGrade: MembersGradeCategoryType | string;
  major: string;
  profileImage?: string; // 프로필 이미지가 없을 수도 있으므로 선택적
  email?: string; // 이메일이 없을 수도 있으므로 선택적
  githubUrl?: string; // GitHub 링크가 없을 수도 있으므로 선택적
  linkedinUrl?: string;
  skills?: string[]; // 기술 스택이 없을 수도 있으므로 선택적
  description?: string; // 자기소개가 없을 수도 있으므로 선택적
  studentNumber: string;
  grade: string;
}
