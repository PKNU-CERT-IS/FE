import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";
import { MemberGrade, SemesterType } from "@/types/study";

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
  title: string;
}

export interface ProjectList {
  id: number;
  title: string;
  description: string;
  category: CategoryType;
  subcategory: SubCategoryType;
  startDate: string;
  endDate: string;
  projectCreatorName: string;
  projectCreatorGrade: MemberGrade;
  githubUrl?: string;
  thumbnailUrl?: string;
  participantable: boolean;
  demoUrl?: string;
  MemberGrade: string;
  maxParticipantNumber: number;
  currentParticipantNumber: number;
  semester: SemesterType;
  status: StatusType;
  attachments: AttachedFile[];
}

export interface ProjectCurrentFilters {
  search: string;
  semester: SemesterType;
  category: CategoryType;
  subCategory: SubCategoryType;
  projectStatus: StatusType;
  page?: number;
}

export interface ProjectFilterProps {
  currentFilters: ProjectCurrentFilters;
}

export type FilterKey =
  | "search"
  | "semester"
  | "category"
  | "subCategory"
  | "projectStatus";

export const AUTHOR_STATUS_LABELS: Record<
  "student" | "graduate" | "organization",
  string
> = {
  student: "학부생",
  graduate: "대학원생",
  organization: "기관/단체",
};

// 외부 링크
export interface ExternalLink {
  title: string;
  url: string;
}

// 미팅 요약
export interface MeetingSummary {
  id: number;
  title: string;
  content: string;
  participantNumber: number;
  creatorName: string;
  createdAt: string; // ISO date
  links: ExternalLink[];
  editable: boolean;
}

// 참여자 요약
export interface ParticipantSummary {
  id: number;
  memberId: number;
  memberName: string;
  memberGrade: "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR" | string; // enum 확장 가능
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  createdAt: string;
}

// 메인 타입
export interface ProjectMaterial {
  id: number;
  title: string;
  content: string;
  description: string;
  category: CategoryType;
  subCategory: SubCategoryType;
  startDate: string; // ISO 날짜
  endDate: string; // ISO 날짜
  creatorId: number;
  projectCreatorName: string;
  projectCreatorGrade: MemberGrade;
  semester: SemesterType;
  status: StatusType; // 서버에서 string
  githubUrl?: string;
  externalUrl?: ExternalLink;
  demoUrl?: string;
  thumbnailUrl?: string;
  attachments: AttachedFile[];
  meetingSummaries: MeetingSummary[];
  participantSummaries: ParticipantSummary[];
  maxParticipantNumber: number;
  currentParticipantNumber: number;
  participantable: boolean;
  profileImageUrl: string;
}
export interface ProjectSearchParams {
  search?: string;
  semester?: string;
  category?: string;
  subCategory?: string;
  projectStatus?: string;
  page?: string;
}
