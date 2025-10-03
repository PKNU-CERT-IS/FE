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
    // 문자열일 경우 포맷 정규화
    const normalizeDateString = (dateStr: string) => {
      // case1: "2025-09-22 15:19:16" → "2025-09-22T15:19:16Z"
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateStr)) {
        return dateStr.replace(" ", "T") + "Z";
      }
      return dateStr;
    };

    const date =
      typeof dateInput === "string"
        ? new Date(normalizeDateString(dateInput))
        : dateInput;

    if (isNaN(date.getTime())) return String(dateInput);
    const options: Intl.DateTimeFormatOptions = { timeZone: "Asia/Seoul" };

    if (format === "long") {
      return date.toLocaleDateString("ko-KR", {
        ...options,
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }

    if (format === "medium") {
      return date.toLocaleDateString("ko-KR", {
        ...options,
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }

    if (format === "dot") {
      return date.toLocaleDateString("ko-KR", {
        ...options,
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
      timeZone: "Asia/Seoul",
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

/**
 * 시작일과 종료일을 범위 형식으로 포맷팅합니다.
 * 같은 날이면 시작일만, 다르면 "YYYY.MM.DD ~ YYYY.MM.DD" 형식 반환
 */
export const formatDateRange = (
  startInput: Date | string,
  endInput: Date | string,
  format: "dot" | "short" | "medium" | "long" = "dot"
): string => {
  const startDate =
    typeof startInput === "string" ? new Date(startInput) : startInput;
  const endDate = typeof endInput === "string" ? new Date(endInput) : endInput;

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return `${startInput} ~ ${endInput}`;
  }

  const startStr = formatDate(startDate, format);
  const endStr = formatDate(endDate, format);

  const sameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  return sameDay ? startStr : `${startStr} ~ ${endStr}`;
};
