import BoardCard from "@/components/board/SCBoardCard";
import DefaultNoneResultUi from "@/components/ui/defaultNoneResultUi";
import ShieldSVG from "/public/icons/shield.svg";
import { BoardDataType } from "@/types/board";

export default function BoardCardList({
  contents,
}: {
  contents: BoardDataType[];
}) {
  if (contents.length === 0) {
    return (
      <DefaultNoneResultUi
        icon={<ShieldSVG />}
        title="검색 결과가 없습니다."
        description="검색어를 확인하거나 다른 카테고리를 선택해보세요."
      />
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {contents.map((content) => (
        <BoardCard key={content.id} {...content} />
      ))}
    </div>
  );
}
