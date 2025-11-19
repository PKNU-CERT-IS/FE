import BoardWritePage from "@/app/(main)/board/write/page";
import NewPageModal from "@/components/write/CCNewPageModal";

export default function WriteModalPage() {
  return (
    <NewPageModal>
      <BoardWritePage />
    </NewPageModal>
  );
}
