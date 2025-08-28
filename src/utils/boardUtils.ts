import { BoardDataType, BoardCategoryType } from "@/types/board";

// 검색 필터
const filterBySearch = (board: BoardDataType, search: string) => {
  if (search === "") return true;

  const searchLower = search.toLowerCase();
  return (
    board.title.toLowerCase().includes(searchLower) ||
    board.author.toLowerCase().includes(searchLower) ||
    board.content.toLowerCase().includes(searchLower)
  );
};

// 카테고리 필터
const filterByCategory = (
  board: BoardDataType,
  category: BoardCategoryType
) => {
  return category === "전체" || board.category === category;
};

// 통합 필터
export const filterBoardData = (
  boardData: BoardDataType[],
  search: string,
  category: BoardCategoryType
): BoardDataType[] => {
  return boardData.filter(
    (board) =>
      filterBySearch(board, search) && filterByCategory(board, category)
  );
};

// 보드 css 유틸
export const getCategoryColor = (category: BoardCategoryType) => {
  switch (category) {
    case "공지사항":
      return "bg-red-50 text-red-600 border-red-200";
    case "보안이슈":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "기술자료":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "활동내용":
      return "bg-green-50 text-green-600 border-green-200";
    case "질문":
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};
