import BookSVG from "/public/icons/book.svg";
import CommentSVG from "/public/icons/comment.svg";
import { MembersDataType } from "@/types/members";

export interface ProfileDataType extends MembersDataType {
  joinDate: string;
  penaltyPoint: number;
  penaltyPeriod: number;
  birthday: string;
  phoneNumber: string;
  gender: string;
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
export const StudyCategories = ["Project", "Study"] as const;
export type StudyCategoryType = (typeof StudyCategories)[number];

export interface ProfileStudyDataType {
  id: number;
  title: string;
  date: string;
  category: StudyCategoryType;
  tags: string[];
  status: string; // "진행중", "완료"
}

// study, project status category
export const studyStatus = ["전체", "진행중", "완료"] as const;
export type StudyStatusType = (typeof studyStatus)[number];

// blog category
export const BlogCategories = ["개발", "활동", "회고", "기타"] as const;
export type BlogCategoryType = (typeof BlogCategories)[number];

export interface ProfileBlogDataType {
  id: number;
  title: string;
  date: string;
  category: BlogCategoryType;
  views?: number;
  likes?: number;
  comments?: number;
}
