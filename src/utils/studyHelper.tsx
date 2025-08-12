import type {
  StudyMaterial,
  CurrentFilters,
  SemesterType,
  TechniqueType,
  StatusType,
  StudySearchParams,
} from "@/types/study";

export function isTechniqueType(value: string): value is TechniqueType {
  const validTechniques: TechniqueType[] = [
    "all",
    "web_security",
    "penetration_testing",
    "cryptography",
    "digital_forensics",
    "network_security",
    "malware_analysis",
  ];
  return validTechniques.includes(value as TechniqueType);
}

export function isStatusType(value: string): value is StatusType {
  const validStatuses: StatusType[] = [
    "all",
    "not_started",
    "in_progress",
    "completed",
  ];
  return validStatuses.includes(value as StatusType);
}

// 필터링 함수
export function filterStudyMaterials(
  materials: StudyMaterial[],
  filters: CurrentFilters
): StudyMaterial[] {
  return materials.filter((material) => {
    const matchesSearch =
      !filters.search ||
      material.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      material.description
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      material.author.toLowerCase().includes(filters.search.toLowerCase());

    const matchesSemester =
      filters.semester === "all" || material.semester === filters.semester;

    const matchesTechnique =
      filters.technique === "all" ||
      material.hackingTechnique === filters.technique;

    const matchesStatus =
      filters.status === "all" || material.status === filters.status;

    return (
      matchesSearch && matchesSemester && matchesTechnique && matchesStatus
    );
  });
}

// 상수 정의
export const PARTICIPATION_THRESHOLDS = {
  GRAY_ZONE: 33,
  ORANGE_ZONE: 66,
} as const;

// 상태별 색상 매핑
export const STATUS_COLORS: Record<StatusType, string> = {
  not_started: "bg-gray-100 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  all: "bg-gray-100 text-gray-800",
} as const;

// Progress 바 색상 상수
export const PROGRESS_COLORS = {
  LOW: "#C7D3CC", // 33% 이하 - 연한 회색
  MEDIUM: "#F49236", // 66% 이하 - 주황색
  HIGH: "#16A34A", // 67% 이상 - 초록색
} as const;

/**
 * 상태에 따른 CSS 클래스를 반환합니다.
 * @param status - 스터디 상태
 * @returns CSS 클래스 문자열
 */
export const getStatusColor = (status: StatusType): string => {
  return STATUS_COLORS[status] || STATUS_COLORS.all;
};

/**
 * 참여율에 따른 Progress 바 색상을 반환합니다.
 * @param percentage - 참여율 (0-100)
 * @returns 색상 hex 코드
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage <= PARTICIPATION_THRESHOLDS.GRAY_ZONE) {
    return PROGRESS_COLORS.LOW;
  }
  if (percentage <= PARTICIPATION_THRESHOLDS.ORANGE_ZONE) {
    return PROGRESS_COLORS.MEDIUM;
  }
  return PROGRESS_COLORS.HIGH;
};

/**
 * 현재 날짜로부터 목표 날짜까지의 일수를 계산합니다.
 * @param targetDate - 목표 날짜 (YYYY-MM-DD 형식)
 * @returns 남은 일수 (음수면 과거)
 */
export const calculateDaysFromNow = (targetDate: string): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * 스터디 상태에 따른 날짜 정보를 반환합니다.
 * @param status - 스터디 상태
 * @param startDate - 시작 날짜 (선택사항)
 * @param endDate - 종료 날짜 (선택사항)
 * @param semester - 학기 정보 (선택사항)
 * @returns 상태별 날짜 표시 문자열
 */
export const getStatusDateInfo = (
  status: StatusType,
  startDate?: string,
  endDate?: string,
  semester?: string
): string => {
  switch (status) {
    case "not_started":
      if (startDate) {
        const daysLeft = calculateDaysFromNow(startDate);
        return daysLeft > 0 ? `${daysLeft}일 뒤` : "곧 시작";
      }
      return "날짜 미정";

    case "in_progress":
      if (endDate) {
        const daysLeft = calculateDaysFromNow(endDate);
        return daysLeft > 0 ? `D-${daysLeft}` : "종료 임박";
      }
      return "진행 중";

    case "completed":
      return semester ? `${semester} 진행` : "종료됨";

    default:
      return "";
  }
};

/**
 * 참여율을 계산합니다.
 * @param current - 현재 참가자 수
 * @param max - 최대 참가자 수
 * @returns 참여율 (0-100, 반올림)
 */
export const calculateParticipationRate = (
  current: number,
  max: number
): number => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};

export function parseSearchParams(
  searchParams?: StudySearchParams | null
): CurrentFilters {
  if (!searchParams) {
    return {
      search: "",
      semester: "all" as SemesterType,
      technique: "all" as TechniqueType,
      status: "all" as StatusType,
      page: 1,
    };
  }

  return {
    search: searchParams.search || "",
    semester: (searchParams.semester as SemesterType) || "all",
    technique: (searchParams.technique as TechniqueType) || "all",
    status: (searchParams.status as StatusType) || "all",
    page: parseInt(searchParams.page || "1", 10),
  };
}

/**
 * 페이지 URL 생성 유틸리티 함수
 */
export function createPageUrl(
  page: number,
  searchParams: StudySearchParams
): string {
  const params = new URLSearchParams();
  const safeSearchParams = searchParams || {};
  Object.entries(safeSearchParams).forEach(([key, value]) => {
    if (value && key !== "page") {
      params.set(key, value);
    }
  });

  // 페이지 파라미터 설정
  if (page > 1) {
    params.set("page", page.toString());
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

// study D-Day 계산을 위한 함수
export function calculateDDay(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
