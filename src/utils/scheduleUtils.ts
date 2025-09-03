import {
  SCHEDULE_TYPES,
  ScheduleStatusType,
  ScheduleType,
} from "@/types/schedule";

// schedule type
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
      return "badge-purple";
    case SCHEDULE_TYPES.WORKSHOP:
      return "badge-red";
    case SCHEDULE_TYPES.STUDY:
      return "badge-blue";
    case SCHEDULE_TYPES.CONFERENCE:
      return "badge-green";
    default:
      return "badge-gray";
  }
};

// schedule status
export function getStatusColor(status: string): ScheduleStatusType {
  switch (status) {
    case "PENDING":
      return "badge-yellow";
    case "APPROVED":
      return "badge-green";
    case "REJECTED":
      return "badge-red";
    default:
      return "badge-gray";
  }
}

export function getStatusLabel(status: string): ScheduleStatusType {
  switch (status) {
    case "PENDING":
      return "승인 대기";
    case "APPROVED":
      return "승인 완료";
    case "REJECTED":
      return "승인 거절";
    default:
      return "Undefined";
  }
}

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
