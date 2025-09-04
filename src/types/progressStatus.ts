export type StatusType = "all" | "not_started" | "in_progress" | "completed";

export const STATUS_OPTIONS: StatusType[] = [
  "all",
  "not_started",
  "in_progress",
  "completed",
];
export const STATUS_LABELS: Record<StatusType, string> = {
  all: "전체",
  not_started: "시작 전",
  in_progress: "진행 중",
  completed: "종료",
};
