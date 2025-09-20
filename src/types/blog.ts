import { CategoryType, SubCategoryType } from "@/types/category";

export interface BlogsKeywordSearch {
  search?: string;
  category?: string;
}

export interface BlogCreateRequest {
  title: string;
  description: string;
  category: string;
  content: string;
  referenceType: string;
  referenceTitle?: string;
  referenceId?: number;
}

export interface BlogReferenceType {
  referenceType: "STUDY" | "PROJECT";
  referenceTitle?: string;
  referenceId?: number;
}

export interface BlogUpdateRequest {
  blogId: number;
  title: string;
  description: string;
  category: string;
  content: string;
  referenceType: string;
  referenceId?: number;
  referenceTitle?: string;
}

// 블로그 카테고리 타입
export const BLOG_CATEGORIES = [
  "전체",
  "CTF",
  "CS",
  "RED",
  "BLUE",
  "GRC",
  "MISC",
  "기타",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// 페이지네이션 설정
export const ITEMS_PER_PAGE = 10;

export interface BlogDataType {
  id: number;
  title: string;
  description: string;
  category: BlogCategory | CategoryType | SubCategoryType;
  createdAt: string;
  blogCreatorName: string;

  // 선택적으로 오는 값들
  referenceType?: "STUDY" | "PROJECT";
  referenceTitle?: string;
}

export interface BlogDetailDataType extends BlogDataType {
  content: string;
  viewCount: number;
  creatorName: string;
}
// 블로그 필터 인터페이스
export interface BlogFilter {
  search?: string;
  category?: BlogCategory;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
}

// 페이지네이션 인터페이스
export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
