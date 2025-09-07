import { AttachedFile } from "@/types/attachedFile";
import {
  CATEGORY_OPTIONS,
  CategoryType,
  SUBCATEGORY_OPTIONS,
  SubCategoryType,
} from "@/types/category";
import { STATUS_OPTIONS, StatusType } from "@/types/progressStatus";

export type SemesterType = "all" | "2025-2";

export type AuthorStatusType = "student" | "graduate";

// 필터 키 타입
export type FilterKey =
  | "search"
  | "semester"
  | "category"
  | "subCategory"
  | "status";

// 페이지 검색 파라미터
export interface StudySearchParams {
  search?: string;
  semester?: string;
  category?: string;
  subCategory?: string;
  status?: string;
  page?: string;
}

// 현재 필터 상태
export interface CurrentFilters {
  search: string;
  semester: SemesterType;
  category: CategoryType;
  subCategory: SubCategoryType;
  status: StatusType;
  page: number;
}

// Study Material
export interface StudyMaterial {
  id: string;
  isPending: boolean;
  title: string;
  description: string;
  author: string;
  authorStatus: AuthorStatusType;
  semester: SemesterType;
  attachedFiles?: AttachedFile[];
  category: CategoryType;
  subCategory: SubCategoryType;
  hackingTechnique?: CategoryType;
  status: StatusType;
  startDate?: string;
  endDate?: string;
  currentParticipants: number;
  maxParticipants: number;
}

// 컴포넌트 Props
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

// 옵션
export const SEMESTER_OPTIONS: readonly SemesterType[] = [
  "all",
  "2025-2",
] as const;

// Label
export const SEMESTER_LABELS: Record<SemesterType, string> = {
  all: "전체",
  "2025-2": "2025-2학기",
} as const;

export const AUTHOR_STATUS_LABELS: Record<AuthorStatusType, string> = {
  student: "재학생",
  graduate: "졸업생",
} as const;

// 유틸 타입
export type NonEmptyArray<T> = [T, ...T[]];
export type FilterOptions = {
  semester: typeof SEMESTER_OPTIONS;
  category: typeof CATEGORY_OPTIONS;
  subCategory: typeof SUBCATEGORY_OPTIONS;
  status: typeof STATUS_OPTIONS;
};

// API
export interface StudyMaterialsResponse {
  materials: StudyMaterial[];
  totalCount: number;
  totalPages: number;
}
export interface FilterParams extends Omit<CurrentFilters, "page"> {
  page: number;
}

// 회의록
export interface MeetingMinute {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  delete_at?: string;
  content: string;
  participants: number;
  author: string;
  links: LinkItem[];
}
export interface LinkItem {
  title: string;
  url: string;
}
