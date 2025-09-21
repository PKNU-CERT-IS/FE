// 상수 타입 정의
export const SCHEDULE_TYPES = {
  MEETING: "meeting",
  WORKSHOP: "workshop",
  STUDY: "study",
  CONFERENCE: "conference",
} as const;

export type ScheduleType = (typeof SCHEDULE_TYPES)[keyof typeof SCHEDULE_TYPES];

export const SCHEDULE_STATUS_TYPES = {
  PENDING: "PENDING",
  APPROVE: "APPROVE",
  REJECTED: "REJECTED",
};

export type ScheduleStatusType =
  (typeof SCHEDULE_STATUS_TYPES)[keyof typeof SCHEDULE_STATUS_TYPES];

// 스케줄 등록
export interface ScheduleCreateRequest {
  title: string;
  description?: string;
  type: ScheduleType;
  started_at: string; // ISO date string
  ended_at: string;
  place: string;
}

// 스케줄 정보 조회
export interface ScheduleInfo extends ScheduleCreateRequest {
  id: number;
  status: ScheduleStatusType;
  created_at: string;
}

export interface ScheduleInProfileData {
  id: number;
  title: string;
  description?: string;
  type: ScheduleType;
  place: string;
  startTime: string;
  endTime: string;
}
