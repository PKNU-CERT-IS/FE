import BoardCard from "@/components/board/SCBoardCard";
import { BoardDataType } from "@/types/board";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

export default function BoardCardList({
  contents,
}: {
  contents: BoardDataType[];
}) {
  if (contents.length === 0) {
    return (
      <div className="mb-8">
        <SCSearchResultNotFound mode="board" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {contents.map((content) => (
        <BoardCard key={content.boardId} {...content} />
      ))}
    </div>
  );
}
