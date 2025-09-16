// 백엔드 요청할 때 매핑이 필요한 값들을 변환하는 유틸 함수들

/**
 * yyyy-MM-dd 형식의 문자열을 ISO 8601 OffsetDateTime 문자열로 변환
 * 예: "2025-09-24" -> "2025-09-24T00:00:00+09:00"
 */
export function toOffsetDateTime(
  date: string,
  offset: string = "+09:00"
): string {
  if (!date) return "";
  return `${date}T00:00:00${offset}`;
}

/**
 * "남", "여" 값을 "MALE", "FEMALE"로 변환
 */
export function toGenderCode(
  gender: string
): "MALE" | "FEMALE" | "UNKNOWN" | "NONE" {
  if (!gender) return "UNKNOWN";
  if (gender === "남") return "MALE";
  if (gender === "여") return "FEMALE";
  return "NONE";
}

export function translateKoreanToGrade(korean: string): string {
  const koreanToGradeMap: Record<string, string> = {
    "1학년": "FRESHMAN",
    "2학년": "SOPHOMORE",
    "3학년": "JUNIOR",
    "4학년": "SENIOR",
    졸업생: "GRADUATED",
    휴학생: "LEAVE",
    NONE: "NONE",
  };

  return koreanToGradeMap[korean];
}

export function translateKoreanToRole(korean: string): string {
  const koreanToRoleMap: Record<string, string> = {
    관리자: "ADMIN",
    회장: "CHAIRMAN",
    부회장: "VICECHAIRMAN",
    임원진: "STAFF",
    PLAYER: "PLAYER",
    UPSOLVER: "UPSOLVER",
    NONE: "NONE",
  };

  return koreanToRoleMap[korean];
}
