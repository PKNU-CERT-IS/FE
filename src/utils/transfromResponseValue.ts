// 백엔들에서 들어오는 응답값을 변환하는 유틸 함수들
import { MembersRoleCategoryType } from "@/types/members";

/**
 * MemberRole 영문 → 한글 변환 유틸
 */
export function translateMemberRole(role: string): MembersRoleCategoryType {
  const roleMap: Record<string, MembersRoleCategoryType> = {
    ADMIN: "관리자",
    CHAIRMAN: "회장",
    VICECHAIRMAN: "부회장",
    STAFF: "임원진",
    PLAYER: "회원",
    NONE: "NONE",
  };

  return roleMap[role];
}

/**
 * ISO 8601 OffsetDateTime 문자열을 yyyy-MM-dd 로 변환
 * 예: "2025-09-24T00:00:00+09:00" -> "2025-09-24"
 */
export function fromOffsetDateTime(isoDate: string): string {
  if (!isoDate) return "";
  return isoDate.split("T")[0]; // "2025-09-24"
}

/**
 * 영어 → 한글 매핑
 */
export function translateGradeToKorean(grade: string): string {
  const gradeToKoreanMap: Record<string, string> = {
    FRESHMAN: "1학년",
    SOPHOMORE: "2학년",
    JUNIOR: "3학년",
    SENIOR: "4학년",
    GRADUATED: "졸업생",
    LEAVE: "휴학생",
    NONE: "NONE",
  };

  return gradeToKoreanMap[grade];
}

//남 여 대응
export function translateGenderToKorean(gender: string): string {
  const genderToKoreanMap: Record<string, string> = {
    FEMALE: "여",
    MALE: "남",
  };

  return genderToKoreanMap[gender];
}
