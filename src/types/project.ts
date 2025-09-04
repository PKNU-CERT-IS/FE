// types/project.ts

import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "./category";
import { StatusType } from "./progressStatus";

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
  author: string;
  authorStatus: "student" | "graduate" | "organization";
  semester: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  hackingTechnique: CategoryType;
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
  semester: SemesterType;
  category: CategoryType;
  subCategory: SubCategoryType;
  status: StatusType;
  page: number;
}

export interface ProjectFilterProps {
  currentFilters: CurrentFilters;
}

export type FilterKey =
  | "search"
  | "semester"
  | "category"
  | "subCategory"
  | "status";

export type SemesterType =
  | "all"
  | "2025-1"
  | "2025-2"
  | "2024-2"
  | "2024-1"
  | "2023-2"
  | "2023-1";

// 옵션 배열들
export const SEMESTER_OPTIONS: SemesterType[] = [
  "all",
  "2025-2",
  "2025-1",
  "2024-2",
  "2024-1",
  "2023-2",
  "2023-1",
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

export const AUTHOR_STATUS_LABELS: Record<
  "student" | "graduate" | "organization",
  string
> = {
  student: "학부생",
  graduate: "대학원생",
  organization: "기관/단체",
};
