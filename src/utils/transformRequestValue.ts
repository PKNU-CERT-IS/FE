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

/**
 * yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss → yyyy-MM-ddTHH:mm:ss+09:00
 */
export function toOffset(
  date: string | Date,
  offset: string = "+09:00"
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
