// 상수 타입 정의
export const SCHEDULE_TYPES = {
  MEETING: "ADVERTISE", // FIXME:L 타입 변경 시 수정
  WORKSHOP: "WORKSHOP",
  STUDY: "STUDY",
  CONFERENCE: "CONFERENCE",
} as const;

export type ScheduleType = (typeof SCHEDULE_TYPES)[keyof typeof SCHEDULE_TYPES];

export const SCHEDULE_STATUS_TYPES = {
  PENDING: "PENDING",
  APPROVE: "APPROVE",
  REJECTED: "REJECTED",
};

export type ScheduleStatusType =
  (typeof SCHEDULE_STATUS_TYPES)[keyof typeof SCHEDULE_STATUS_TYPES];

export interface ScheduleCreateRequest {
  title: string;
  description?: string;
  type: ScheduleType;
  startedAt: string;
  endedAt: string;
  place?: string;
}

// 관리자 전용 예약 생성 요청
export interface AdminScheduleCreateRequest extends ScheduleCreateRequest {
  place: string;
}

export interface ScheduleInfo extends ScheduleCreateRequest {
  scheduleId: number;
  place: string;
  status: ScheduleStatusType;
  createdAt: string; // 오늘 날짜
}

export interface AdminScheduleInfo extends ScheduleInfo {
  memberInfo: {
    memberId: number;
    memberName: string;
  };
}

export interface ScheduleInProfileData {
  id: number;
  title: string;
  description?: string;
  type: ScheduleType;
  place: string;
  startTime: string;
  endTime: string;
  scheduleId: number;
}
