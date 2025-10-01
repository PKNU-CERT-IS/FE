import { AttachedFile } from "@/types/attachedFile";
import {
  CATEGORY_OPTIONS,
  CategoryType,
  SUBCATEGORY_OPTIONS,
  SubCategoryType,
} from "@/types/category";
import { STATUS_OPTIONS, StatusType } from "@/types/progressStatus";

export type SemesterType = "ALL" | `${number}-01` | `${number}-02`;

export type MemberGrade =
  | "FRESHMAN"
  | "SOPHOMORE"
  | "JUNIOR"
  | "SENIOR"
  | "GRADUATED"
  | "LEAVE"
  | "NONE";

// UI에 보여줄 한국어 레이블
export const MEMBER_GRADE_LABELS: Record<MemberGrade, string> = {
  FRESHMAN: "1학년",
  SOPHOMORE: "2학년",
  JUNIOR: "3학년",
  SENIOR: "4학년",
  GRADUATED: "졸업생",
  LEAVE: "휴학생",
  NONE: "미지정",
};
// 필터 키 타입
export type FilterKey =
  | "search"
  | "semester"
  | "category"
  | "subCategory"
  | "studyStatus";
// | "projectStatus";

// 페이지 검색 파라미터
export interface StudySearchParams {
  search?: string;
  semester?: string;
  category?: string;
  subCategory?: string;
  studyStatus?: string;
  page?: string;
}

// 현재 필터 상태
export interface StudyCurrentFilters {
  search: string;
  semester: SemesterType;
  category: CategoryType;
  subCategory: SubCategoryType;
  studyStatus: StatusType;
  resultSubmitStatus?: string; // 개설, 종료 요청에 따른 추가 상태
  page: number;
}

// search 결과
export interface StudyList {
  id: number;
  title: string;
  description: string;
  category: CategoryType;
  subcategory: SubCategoryType;
  startDate: string;
  endDate: string;
  studyCreatorName: string;
  studyCreatorGrade: MemberGrade;
  participantable: boolean;

  maxParticipantNumber: number;
  currentParticipantNumber: number;
  semester: SemesterType;
  status: StatusType;
  attachments: AttachedFile[];
  resultSubmitStatus: string;
}

// Detail Study Material
export interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  startDate: string;
  endDate: string;
  studyCreatorName: string;
  studyCreatorGrade: MemberGrade;
  currentParticipantNumber: number;
  maxParticipantNumber: number;
  attachments: AttachedFile[];
  participantable: boolean;
  semester: SemesterType;
  status: StatusType;
  creatorId: number;
  content: string;
  studyCreatorProfileImageUrl: string;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface StudyData {
  totalElements: number;
  totalPages: number;
  size: number;
  content: StudyMaterial[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: SortInfo;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 컴포넌트 Props
export interface StudyPageProps {
  searchParams: Promise<StudySearchParams>;
}
export interface StudyFilterProps {
  studyCurrentFilters: StudyCurrentFilters;
}
export interface StudyContentProps {
  studyCurrentFilters: StudyCurrentFilters;
}
export interface StudyPaginationProps {
  currentPage: number;
  totalPages: number;
}
// 현재 학기 계산
export function getCurrentSemester(): SemesterType {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const semester = month <= 6 ? 1 : 2;
  return `${year}-${semester}` as SemesterType;
}

// 옵션: ALL + 현재 학기만
export const SEMESTER_OPTIONS: readonly SemesterType[] = [
  "ALL",
  getCurrentSemester(),
] as const;

// Label: ALL + 현재 학기만
export const SEMESTER_LABELS: Record<SemesterType, string> = {
  ALL: "전체",
  [getCurrentSemester()]: `${getCurrentSemester()}학기`,
} as const;

// 유틸 타입
export type NonEmptyArray<T> = [T, ...T[]];
export type FilterOptions = {
  semester: typeof SEMESTER_OPTIONS;
  category: typeof CATEGORY_OPTIONS;
  subCategory: typeof SUBCATEGORY_OPTIONS;
  studystatus: typeof STATUS_OPTIONS;
};

// API
export interface StudyMaterialsResponse {
  materials: StudyMaterial[];
  totalCount: number;
  totalPages: number;
}
export interface FilterParams extends Omit<StudyCurrentFilters, "page"> {
  page: number;
}

// study 생성 API 타입
export interface CreateStudyFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  subCategory: string;
  startDate: string;
  endDate: string;
  attachments?: AttachedFile[];
  maxParticipants: number;
}

export interface UpdateStudyFormData extends CreateStudyFormData {
  studyId: number;
}

export function normalizeSemester(value: string): string {
  if (!value) return value;
  const [year, sem] = value.split("-");
  // 뒤에 두 자리 패딩
  return `${year}-${sem.padStart(2, "0")}`;
}
