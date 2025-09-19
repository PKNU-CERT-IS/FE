import {
  BoardDataType,
  BoardCategoryType,
  categoryMappingToKO,
  BoardCategoryTypeEN,
  toKoreanCategory,
} from "@/types/board";

// 검색 필터
const filterBySearch = (board: BoardDataType, search: string) => {
  if (search === "") return true;

  const searchLower = search.toLowerCase();
  return (
    board.title.toLowerCase().includes(searchLower) ||
    board.authorName.toLowerCase().includes(searchLower) ||
    board.content.toLowerCase().includes(searchLower)
  );
};

// 카테고리 필터
const filterByCategory = (
  board: BoardDataType,
  category: BoardCategoryType
) => {
  if (category === "전체") return true;

  const koreanCategory =
    categoryMappingToKO[board.category as BoardCategoryTypeEN];

  return koreanCategory === category;
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

// Board Category Util
export const getBoardCategoryColor = (category: BoardCategoryTypeEN) => {
  const koreanCategory = toKoreanCategory(category);

  switch (koreanCategory) {
    case "공지사항":
      return "badge-red";
    case "보안이슈":
      return "badge-orange";
    case "기술자료":
      return "badge-blue";
    case "활동내용":
      return "badge-green";
    case "질문":
      return "badge-gray";
    default:
      return "badge-gray";
  }
};
