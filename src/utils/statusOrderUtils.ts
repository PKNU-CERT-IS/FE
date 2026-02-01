// Status 정렬 순서 정의: 진행중 → 준비중 → 완료
export const STATUS_ORDER: Record<string, number> = {
  INPROGRESS: 1,
  READY: 2,
  COMPLETED: 3,
};

// status 토글
export const statusToggleOptions = [
  { value: "READY", label: "준비 중" },
  { value: "INPROGRESS", label: "진행 중" },
  { value: "COMPLETED", label: "완료" },
];
