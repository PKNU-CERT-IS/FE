import { BoardCategoryType, categoryMappingToEN } from "@/types/board";
import { getBoards } from "@/app/api/board/SCBoardApi";
import BoardCardList from "@/components/board/SCBoardCardList";
import BoardPagination from "@/components/board/SCBoardPagination";

interface BoardContentsProps {
  keyword: string;
  category: BoardCategoryType;
  page: number;
  size: number;
}

export default async function BoardContents({
  keyword,
  category,
  page,
  size,
}: BoardContentsProps) {
  const enCategory = category !== "전체" ? categoryMappingToEN[category] : "";

  const data = await getBoards(keyword, enCategory, page - 1, size);

  const contents = data.content ?? [];
  const totalItems = data.totalElements ?? data.totalCount ?? 0;

  return (
    <>
      <BoardCardList contents={contents} />
      <BoardPagination
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={size}
        currentSearch={keyword}
        currentCategory={category}
      />
    </>
  );
}
