import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/study";

/**
 * 스터디 생성 폼에서 사용하는 데이터 타입
 * - attachments: 첨부파일 목록
 * - startDate, endDate: YYYY-MM-DD 형식
 */
export interface StudyCreateFormData {
  id: number;
  isPending: boolean;
  title: string;
  description: string;
  content: string;
  semester: string;
  status: StatusType;
  category: CategoryType;
  subCategory: SubCategoryType;
  attachments: AttachedFile[];
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  maxParticipants: string;
  author: string;
}
/**
 * 외부 링크 정보
 */
export interface ExternalLink {
  label: string;
  url: string;
}
/**
 * 프로젝트 생성 폼에서 사용하는 데이터 타입
 */
export interface ProjectCreateFormData {
  id: number;
  isPending: boolean;
  title: string;
  description: string;
  content: string;
  semester: string;
  status: StatusType;
  category: CategoryType;
  subCategory: SubCategoryType;
  attachments: AttachedFile[];
  startDate: string;
  endDate: string;
  maxParticipants: string;
  githubUrl?: string;
  demoUrl?: string;
  externalLinks: ExternalLink[];
  projectImage: File | null;
  author: string;
}

/**
 * 승인 여부에 따라 다른 필드를 가지는 스터디 타입
 * - 승인 대기: currentParticipants, progress 없음
 * - 승인 완료: currentParticipants, progress 포함
 */
export type Study =
  | ({
      isPending: true;
      currentParticipants?: never;
      progress?: never;
    } & StudyCreateFormData)
  | ({
      isPending: false;
      currentParticipants: number;
      progress?: number;
    } & StudyCreateFormData);

/** 승인 완료된 스터디 판별 함수 */
export const isApprovedStudy = (
  s: Study
): s is Extract<Study, { isPending: false }> => s.isPending === false;

/**
 * 승인 여부에 따라 다른 필드를 가지는 프로젝트 타입
 * - 승인 대기: currentParticipants, progress 없음
 * - 승인 완료: currentParticipants, progress 포함
 */
export type Project =
  | ({
      isPending: true;
      currentParticipants?: never;
      progress?: never;
    } & ProjectCreateFormData)
  | ({
      isPending: false;
      currentParticipants: number;
      progress?: number;
    } & ProjectCreateFormData);

/** 승인 완료된 프로젝트 판별 함수 */
export const isApprovedProject = (
  p: Project
): p is Extract<Project, { isPending: false }> => p.isPending === false;
