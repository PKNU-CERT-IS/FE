import { SCHEDULE_TYPES, ScheduleType } from "@/types/schedule";

export const getTypeLabel = (type: ScheduleType) => {
  switch (type) {
    case SCHEDULE_TYPES.MEETING:
      return "회의";
    case SCHEDULE_TYPES.WORKSHOP:
      return "정기 모임";
    case SCHEDULE_TYPES.STUDY:
      return "스터디";
    case SCHEDULE_TYPES.CONFERENCE:
      return "컨퍼런스";
    default:
      return "기타";
  }
};
export const labelToType = (label: string): ScheduleType | null => {
  switch (label) {
    case "회의":
      return SCHEDULE_TYPES.MEETING;
    case "정기 모임":
      return SCHEDULE_TYPES.WORKSHOP;
    case "스터디":
      return SCHEDULE_TYPES.STUDY;
    case "컨퍼런스":
      return SCHEDULE_TYPES.CONFERENCE;
    default:
      return null;
  }
};

export const getTypeColor = (type: ScheduleType) => {
  switch (type) {
    case SCHEDULE_TYPES.MEETING:
      return "bg-purple-50 text-purple-600 border-purple-200";
    case SCHEDULE_TYPES.WORKSHOP:
      return "bg-red-50 text-red-600 border-red-200";
    case SCHEDULE_TYPES.STUDY:
      return "bg-blue-50 text-blue-600 border-blue-200";
    case SCHEDULE_TYPES.CONFERENCE:
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

/**
 * 날짜 상수들
 */
export const MONTH_NAMES = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
] as const;

export const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

/**
 * 캘린더에 표시할 날짜 배열 생성
 */
export const generateCalendarDays = (currentDate: Date): Date[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days: Date[] = [];
  const current = new Date(startDate);

  while (current <= lastDay || days.length % 7 !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};
