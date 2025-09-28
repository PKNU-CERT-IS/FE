/**
 * 오늘 날짜와 targetDate의 차이를 계산해서 D-day 문자열 반환
 * @param target yyyy-MM-dd 형식 or ISO8601 날짜 문자열
 * @returns 예: "D-3", "D-Day", "D+2"
 */
export function getDDay(target: string): string {
  if (!target) return "";

  const today = new Date();
  const targetDate = new Date(target);

  // 시분초 무시하고 날짜만 비교
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "D-Day";
  if (diffDays > 0) return `D - ${diffDays}`;
  return `D+${Math.abs(diffDays)}`; // 이미 지난 날짜
}

// 시작주 선택시 월요일만 선택
export const getNextMonday = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = (8 - day) % 7;
  today.setDate(today.getDate() + diff);
  return today.toISOString().split("T")[0];
};
// 종료주 선택시 일요일만 선택
export const getNextSunday = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = (7 - day) % 7;
  today.setDate(today.getDate() + diff);
  return today.toISOString().split("T")[0];
};
