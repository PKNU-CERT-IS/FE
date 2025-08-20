/**
 * 날짜를 지정된 형식으로 포맷팅합니다.
 *
 * @param dateInput - Date 객체 또는 날짜 문자열
 * @param format - 출력 형식
 *   - "short": YYYY-MM-DD (예: 2025-08-09)
 *   - "medium": M월 D일 요일 (예: 8월 9일 토요일)
 *   - "long": YYYY년 M월 D일 요일 (예: 2025년 8월 9일 토요일)
 *   - "dot": YYYY. MM. DD (예: 2025. 08. 09)
 * @returns 포맷팅된 날짜 문자열 (유효하지 않은 날짜면 원본 문자열 반환)
 */
export const formatDate = (
  dateInput: Date | string,
  format: "short" | "medium" | "long" | "dot" = "short"
): string => {
  try {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    if (format === "long") {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }

    if (format === "medium") {
      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }

    if (format === "dot") {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    // short
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.warn("Date formatting error:", error);
    return String(dateInput);
  }
};

/**
 * 시간을 지정된 형식으로 포맷팅합니다.
 *
 * @param dateInput - Date 객체 또는 날짜 문자열
 * @param format - 출력 형식
 *   - "hm": HH:mm (24시간제, 예: 09:05 또는 13:05)
 *   - "hms": HH:mm:ss (24시간제, 예: 09:05:30 또는 13:05:30)
 * @returns 포맷팅된 시간 문자열 (유효하지 않은 날짜면 원본 문자열 반환)
 */
export const formatTime = (
  dateInput: Date | string,
  format: "hm" | "hms" = "hm"
): string => {
  try {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    if (format === "hms") {
      options.second = "2-digit";
    }

    return date.toLocaleTimeString("ko-KR", options);
  } catch (error) {
    console.warn("Time formatting error:", error);
    return String(dateInput);
  }
};
