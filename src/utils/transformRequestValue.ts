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
