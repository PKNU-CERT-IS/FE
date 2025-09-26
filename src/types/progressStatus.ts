export type StatusType =
  | "ALL"
  | "READY"
  | "APPROVED"
  | "INPROGRESS"
  | "COMPLETED";

export const STATUS_OPTIONS: StatusType[] = [
  "ALL",
  "READY",
  "APPROVED",
  "INPROGRESS",
  "COMPLETED",
];
export const STATUS_LABELS: Record<StatusType, string> = {
  ALL: "전체",
  READY: "준비 중",
  APPROVED: "준비 중", // READY와 동일하게 표시(시작 전에만 표시되니 같다고 판단)
  INPROGRESS: "진행 중",
  COMPLETED: "완료",
};

// status 필터 옵션 (전체, 준비 중, 진행 중, 완료)
export const STATUS_FILTER_OPTIONS: StatusType[] = [
  "ALL",
  "READY",
  "INPROGRESS",
  "COMPLETED",
];
