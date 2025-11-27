import { BoardCategoryTypeEN, toKoreanCategory } from "@/types/board";

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
