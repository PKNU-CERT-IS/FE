import { AttachedFile } from "@/types/attachedFile";

export type SemesterType = "all" | "2025-2";

export type TechniqueType =
  | "all"
  | "web_security"
  | "penetration_testing"
  | "cryptography"
  | "digital_forensics"
  | "reverse_engineering"
  | "network_security"
  | "mobile_security"
  | "malware_analysis"
  | "blockchain_security"
  | "cloud_security"
  | "social_engineering";

export type StatusType = "all" | "not_started" | "in_progress" | "completed";

export type AuthorStatusType = "student" | "graduate";

// 필터 키 타입
export type FilterKey = "search" | "semester" | "technique" | "status";

// 페이지 검색 파라미터 인터페이스
export interface StudySearchParams {
  search?: string;
  semester?: string;
  technique?: string;
  status?: string;
  page?: string;
}

// 현재 필터 상태 인터페이스 (강타이핑 적용)
export interface CurrentFilters {
  search: string;
  semester: SemesterType;
  technique: TechniqueType;
  status: StatusType;
  page: number;
}

// Study Material 타입 정의
export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  customTags: { name: string; color: string }[];
  author: string;
  authorStatus: AuthorStatusType;
  semester: SemesterType;
  attachedFiles?: AttachedFile[];
  category: string;
  hackingTechnique?: TechniqueType;
  status: StatusType;
  startDate?: string;
  endDate?: string;
  currentParticipants: number;
  maxParticipants: number;
}

// 컴포넌트 Props 타입들
export interface StudyPageProps {
  searchParams: Promise<StudySearchParams>;
}

export interface StudyFilterProps {
  currentFilters: CurrentFilters;
}

export interface StudyContentProps {
  currentFilters: CurrentFilters;
}

export interface StudyPaginationProps {
  currentPage: number;
  totalPages: number;
}

// 필터 옵션 상수들 (영어 타입)
export const SEMESTER_OPTIONS: readonly SemesterType[] = [
  "all",
  "2025-2",
] as const;

export const TECHNIQUE_OPTIONS: readonly TechniqueType[] = [
  "all",
  "web_security",
  "penetration_testing",
  "cryptography",
  "digital_forensics",
  "network_security",
  "malware_analysis",
  "mobile_security",
  "reverse_engineering",
  "blockchain_security",
  "cloud_security",
  "social_engineering",
] as const;

export const STATUS_OPTIONS: readonly StatusType[] = [
  "all",
  "not_started",
  "in_progress",
  "completed",
] as const;

// 한국어 표시용 매핑 객체들
export const SEMESTER_LABELS: Record<SemesterType, string> = {
  all: "전체",
  "2025-2": "2025-2학기",
} as const;

export const TECHNIQUE_LABELS: Record<TechniqueType, string> = {
  all: "전체",
  web_security: "웹 보안",
  penetration_testing: "모의해킹",
  cryptography: "암호학",
  digital_forensics: "디지털 포렌식",
  network_security: "네트워크 보안",
  malware_analysis: "악성코드 분석",
  mobile_security: "모바일 보안",
  reverse_engineering: "리버스 엔지니어링",
  blockchain_security: "블록체인 보안",
  cloud_security: "클라우드 보안",
  social_engineering: "소셜 엔지니어링",
} as const;

export const STATUS_LABELS: Record<StatusType, string> = {
  all: "전체",
  not_started: "시작 전",
  in_progress: "진행 중",
  completed: "종료",
} as const;

export const AUTHOR_STATUS_LABELS: Record<AuthorStatusType, string> = {
  student: "재학생",
  graduate: "졸업생",
} as const;

// 역방향 매핑 (한국어 → 영어)
export const SEMESTER_VALUES: Record<string, SemesterType> = {
  전체: "all",
  "2025-2학기": "2025-2",
} as const;

export const TECHNIQUE_VALUES: Record<string, TechniqueType> = {
  전체: "all",
  "웹 보안": "web_security",
  모의해킹: "penetration_testing",
  암호학: "cryptography",
  "디지털 포렌식": "digital_forensics",
  "네트워크 보안": "network_security",
  "악성코드 분석": "malware_analysis",
  "모바일 보안": "mobile_security",
  "리버스 엔지니어링": "reverse_engineering",
  "블록체인 보안": "blockchain_security",
  "클라우드 보안": "cloud_security",
  "소셜 엔지니어링": "social_engineering",
} as const;

export const STATUS_VALUES: Record<string, StatusType> = {
  전체: "all",
  "시작 전": "not_started",
  "진행 중": "in_progress",
  종료: "completed",
} as const;

// 유틸리티 타입들
export type NonEmptyArray<T> = [T, ...T[]];

export type FilterOptions = {
  semester: typeof SEMESTER_OPTIONS;
  technique: typeof TECHNIQUE_OPTIONS;
  status: typeof STATUS_OPTIONS;
};

// API 관련 타입들
export interface StudyMaterialsResponse {
  materials: StudyMaterial[];
  totalCount: number;
  totalPages: number;
}

export interface FilterParams extends Omit<CurrentFilters, "page"> {
  page: number;
}

// Meeting minute 타입 정의
export interface MeetingMinute {
  id: number;
  week: number;
  title: string;
  date: string;
  content: string;
  attendees: string[];
  author: string;
  links: LinkItem[];
}

export interface LinkItem {
  title: string;
  url: string;
}
