export const boardCategories = [
  "전체",
  "공지사항",
  "활동내용",
  "보안이슈",
  "기술자료",
  "질문",
] as const;

export const boardCategoriesEN = [
  "ALL",
  "NOTICE",
  "ACTIVITY",
  "SECURITY",
  "TECH",
  "QUESTION",
] as const;

export type BoardCategoryType = (typeof boardCategories)[number];
export type BoardCategoryTypeEN = (typeof boardCategoriesEN)[number];

// 카테고리 매핑 객체 추가
export const categoryMappingToEN: Record<
  BoardCategoryType,
  BoardCategoryTypeEN
> = {
  전체: "ALL",
  공지사항: "NOTICE",
  활동내용: "ACTIVITY",
  보안이슈: "SECURITY",
  기술자료: "TECH",
  질문: "QUESTION",
};

export const categoryMappingToKO: Record<
  BoardCategoryTypeEN,
  BoardCategoryType
> = {
  ALL: "전체",
  NOTICE: "공지사항",
  ACTIVITY: "활동내용",
  SECURITY: "보안이슈",
  TECH: "기술자료",
  QUESTION: "질문",
};

export const toEnglishCategory = (
  category: BoardCategoryType
): BoardCategoryTypeEN => {
  return categoryMappingToEN[category];
};

export const toKoreanCategory = (
  category: BoardCategoryTypeEN
): BoardCategoryType => {
  return categoryMappingToKO[category];
};

export interface BoardDataType {
  boardId: number;
  title: string;
  description: string;
  content: string;
  authorName: string;
  updatedAt: string;
  category: BoardCategoryTypeEN;
  viewCount: number;
  likeCount: number;
}

// 임시 새 페이지 폼 데이터 타입
export interface NewBoardFormData {
  title: string;
  description: string;
  category: string;
  content: string;
  attachments?: AttachedFile[];
}

// 첨부파일 타입 정의
export interface AttachedFile {
  id: string;
  name: string;
  size: number; // bytes
  type: string; // MIME type
  attachedUrl: string;
}
