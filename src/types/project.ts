// types/project.ts

// 첨부파일 타입 정의
export interface AttachedFile {
  id: string;
  name: string;
  size: number; // bytes
  type: string; // MIME type
  category: FileCategory;
  downloadUrl: string;
  uploadDate: string;
  description?: string;
}

export type FileCategory =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "code"
  | "dataset"
  | "report"
  | "presentation"
  | "other";

export interface ExternalLink {
  url: string;
  label: string;
  type?: "notion" | "gdocs" | "drive" | "figma" | "web";
}

export interface ProjectMaterial {
  id: string;
  title: string;
  description: string;
  image?: string; // 프로젝트 대표 이미지
  customTags: Array<{
    name: string;
    color: string;
  }>;
  author: string;
  authorStatus: "student" | "graduate" | "organization";
  semester: string;
  category: ProjectCategoryType; // string에서 ProjectCategoryType으로 변경
  hackingTechnique: TechniqueType;
  status: StatusType;
  startDate: string;
  endDate?: string;
  currentParticipants: number;
  maxParticipants: number;
  githubUrl?: string; // GitHub 저장소 URL
  demoUrl?: string; // 데모/배포 URL
  stars?: number; // GitHub 스타 수
  attachedFiles?: AttachedFile[]; // 첨부파일 배열 추가
  externalLinks?: ExternalLink[]; // 외부 문서/링크 배열 추가
}

export interface CurrentFilters {
  search: string;
  category: ProjectCategoryType; // 추가
  semester: SemesterType;
  technique: TechniqueType;
  status: StatusType;
  page: number;
}

export interface ProjectFilterProps {
  currentFilters: CurrentFilters;
}

export interface ProjectPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string; // 추가
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

export type FilterKey =
  | "search"
  | "category"
  | "semester"
  | "technique"
  | "status"; // category 추가

// 프로젝트 카테고리 타입 정의
export type ProjectCategoryType =
  | "전체"
  | "CTF"
  | "버그헌팅"
  | "모의해킹"
  | "보안도구개발"
  | "취약점분석"
  | "포렌식"
  | "암호화"
  | "네트워크보안"
  | "웹보안"
  | "모바일보안"
  | "AI보안"
  | "블록체인보안"
  | "IoT보안"
  | "연구개발";

export type SemesterType =
  | "all"
  | "2025-1"
  | "2025-2"
  | "2024-2"
  | "2024-1"
  | "2023-2"
  | "2023-1";

// study.ts의 TechniqueType과 동일하게 맞춤
export type TechniqueType =
  | "all"
  | "web_security"
  | "penetration_testing"
  | "malware_analysis"
  | "cryptography"
  | "digital_forensics"
  | "network_security"
  | "mobile_security"
  | "reverse_engineering"
  | "blockchain_security" // 추가
  | "ai_security" // 추가
  | "iot_security"; // 추가

export type StatusType = "all" | "not_started" | "in_progress" | "completed";

// 옵션 배열들
export const PROJECT_CATEGORIES: ProjectCategoryType[] = [
  "전체",
  "CTF",
  "버그헌팅",
  "모의해킹",
  "보안도구개발",
  "취약점분석",
  "포렌식",
  "암호화",
  "네트워크보안",
  "웹보안",
  "모바일보안",
  "AI보안",
  "블록체인보안",
  "IoT보안",
  "연구개발",
];

export const SEMESTER_OPTIONS: SemesterType[] = [
  "all",
  "2025-2",
  "2025-1",
  "2024-2",
  "2024-1",
  "2023-2",
  "2023-1",
];

export const TECHNIQUE_OPTIONS: TechniqueType[] = [
  "all",
  "web_security",
  "penetration_testing",
  "malware_analysis",
  "cryptography",
  "digital_forensics",
  "network_security",
  "mobile_security",
  "reverse_engineering",
  "blockchain_security", // 추가
  "ai_security", // 추가
  "iot_security", // 추가
];

export const STATUS_OPTIONS: StatusType[] = [
  "all",
  "not_started",
  "in_progress",
  "completed",
];

// 한글 라벨 맵핑
export const SEMESTER_LABELS: Record<SemesterType, string> = {
  all: "전체",
  "2025-2": "2025-2학기",
  "2025-1": "2025-1학기",
  "2024-2": "2024-2학기",
  "2024-1": "2024-1학기",
  "2023-2": "2023-2학기",
  "2023-1": "2023-1학기",
};

export const TECHNIQUE_LABELS: Record<TechniqueType, string> = {
  all: "전체",
  web_security: "웹 보안",
  penetration_testing: "모의해킹",
  malware_analysis: "악성코드 분석",
  cryptography: "암호학",
  digital_forensics: "디지털 포렌식",
  network_security: "네트워크 보안",
  mobile_security: "모바일 보안",
  reverse_engineering: "리버스 엔지니어링",
  blockchain_security: "블록체인 보안", // 추가
  ai_security: "AI 보안", // 추가
  iot_security: "IoT 보안", // 추가
};

export const STATUS_LABELS: Record<StatusType, string> = {
  all: "전체",
  not_started: "시작 예정",
  in_progress: "진행 중",
  completed: "완료",
};

export const AUTHOR_STATUS_LABELS: Record<
  "student" | "graduate" | "organization",
  string
> = {
  student: "학부생",
  graduate: "대학원생",
  organization: "기관/단체",
};
