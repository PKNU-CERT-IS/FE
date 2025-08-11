// 상수 타입 정의
export const SCHEDULE_TYPES = {
  MEETING: "meeting",
  WORKSHOP: "workshop",
  STUDY: "study",
  CONFERENCE: "conference",
} as const;

export type ScheduleType = (typeof SCHEDULE_TYPES)[keyof typeof SCHEDULE_TYPES];

export interface ScheduleInfo {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  type: ScheduleType;
}
