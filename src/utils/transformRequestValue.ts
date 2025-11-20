// 백엔드 요청할 때 매핑이 필요한 값들을 변환하는 유틸 함수들

/**
 * yyyy-MM-dd 형식의 문자열을 ISO 8601 OffsetDateTime 문자열로 변환
 * 예: "2025-09-24" -> "2025-09-24T00:00:00+09:00"
 */
export function toOffsetDateTime(
  date: string,
  offset: string = "+00:00",
): string {
  if (!date) return "";
  return `${date}T00:00:00${offset}`;
}

/**
 * "남", "여" 값을 "MALE", "FEMALE"로 변환
 */
export function toGenderCode(
  gender: string,
): "MALE" | "FEMALE" | "UNKNOWN" | "NONE" {
  if (!gender) return "UNKNOWN";
  if (gender === "남") return "MALE";
  if (gender === "여") return "FEMALE";
  return "NONE";
}

/**
 * yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss → yyyy-MM-ddTHH:mm:ss+09:00
 */
export function toOffset(
  date: string | Date,
  offset: string = "+09:00",
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  // 로컬 시간을 UTC로 보정한 값 (ms 단위)
  const localTime = d.getTime() - d.getTimezoneOffset() * 60000;

  // 보정된 ISO 문자열 (항상 로컬 기준)
  const iso = new Date(localTime).toISOString(); // "2025-09-22T00:00:00.000Z"

  const [ymd, time] = iso.split("T");
  const hhmmss = time.replace("Z", "").split(".")[0];

  return `${ymd}T${hhmmss}${offset}`;
}
/**
 * yyyy-MM-ddTHH:mm:ss+09:00 → yyyy-MM-dd 변환
 * (프론트 표시용)
 */
export function fromOffset(offsetDate: string): string {
  if (!offsetDate) return "";
  return offsetDate.split("T")[0]; // "2025-01-02"
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
// 영어 → 한국어
export function translateRoleToKorean(role: string): string {
  const roleToKoreanMap: Record<string, string> = {
    ADMIN: "관리자",
    CHAIRMAN: "회장",
    VICECHAIRMAN: "부회장",
    STAFF: "임원진",
    PLAYER: "PLAYER",
    UPSOLVER: "UPSOLVER",
    NONE: "없음",
  };

  return roleToKoreanMap[role] ?? role;
}
