export const boardCategories = [
  "전체",
  "공지사항",
  "활동내용",
  "보안이슈",
  "기술자료",
  "질문",
] as const;

export type BoardCategoryType = (typeof boardCategories)[number];

export interface BoardDataType {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: BoardCategoryType;
  views: number;
  likes: number;
}
