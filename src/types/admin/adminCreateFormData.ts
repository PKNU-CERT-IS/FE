import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";

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
