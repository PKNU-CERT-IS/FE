import { MembersDataType } from "@/types/members";
import { BlogCategory } from "./blog";
import BookSVG from "/public/icons/book.svg";
import CommentSVG from "/public/icons/comment.svg";

export interface ProfileDataType extends MembersDataType {
  memberId: number;
  name: string;
  description: string;
  profileImage: string;
  todaySchedules: string[];
  skills: string[];
  createdAt: string; // ISO Date
  major: string;
  birthday: string; // ISO Date
  phoneNumber: string;
  studentNumber: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

// tab category
export const profileTabCategory = ["study", "blog"] as const;
export type ProfileTabCategoryType = (typeof profileTabCategory)[number];

// 탭 구성 정보 상수화
export const TAB_CONFIG: Record<
  ProfileTabCategoryType,
  { label: string; Icon: React.ElementType }
> = {
  study: {
    label: "내 스터디 / 프로젝트",
    Icon: BookSVG,
  },
  blog: {
    label: "내 블로그",
    Icon: CommentSVG,
  },
};

// study category
export const StudyTabs = ["Project", "Study"] as const;
export type StudyTabType = (typeof StudyTabs)[number];

export interface ProfileStudyDataType {
  id: number;
  title: string;
  date: string;
  tab: StudyTabType;
  status: string; // "진행중", "완료"
}

// study, project status category
export type StatusType = "all" | "in_progress" | "completed";

export const studyStatus = ["전체", "진행중", "완료"] as const;
export type StudyStatusType = (typeof studyStatus)[number];

// 영어 한국어 맵핑
export const StudyStatusToStatusType: Record<StudyStatusType, StatusType> = {
  전체: "all",
  진행중: "in_progress",
  완료: "completed",
};

export const StatusTypeToStudyStatus: Record<StatusType, StudyStatusType> = {
  all: "전체",
  in_progress: "진행중",
  completed: "완료",
};

// blog category
export interface ProfileBlogDataType {
  id: number;
  title: string;
  content?: string;
  excerpt: string;
  author: string;
  category: BlogCategory;
  createdAt: string;
  updatedAt?: string;
  views: number;
  featured?: boolean;
  published: boolean;
  slug?: string;
  coverImage?: string;
}
