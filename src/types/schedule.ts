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
  started_at: string;
  ended_at: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  place: string;
  description: string;
  type: ScheduleType;
}

export interface ScheduleStatus {
  id: number;
  schedule_id: number;
  status: "PENDING" | "REJECTED" | "APPROVED";
  updated_at: string;
}
