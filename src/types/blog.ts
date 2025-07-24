// 블로그 카테고리 타입
export const BLOG_CATEGORIES = ["전체", "개발", "학습", "활동"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// 페이지네이션 설정
export const ITEMS_PER_PAGE = 6;

// 블로그 포스트 인터페이스
export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  excerpt: string;
  author: string;
  category: BlogCategory;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  views?: number;
  likes?: number;
  featured?: boolean;
  published?: boolean;
  slug?: string;
  coverImage?: string;
}

// 블로그 필터 인터페이스
export interface BlogFilter {
  search?: string;
  category?: BlogCategory;
  author?: string;
  tags?: string[];
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

// 블로그 목록 응답 인터페이스
export interface BlogListResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
  filter: BlogFilter;
}

// 블로그 검색 결과 인터페이스
export interface BlogSearchResult {
  posts: BlogPost[];
  totalCount: number;
  searchTerm: string;
  category?: BlogCategory;
}
