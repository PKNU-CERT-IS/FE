import StudyWritePage from "@/app/(main)/study/write/page";
import NewPageModal from "@/components/write/CCNewPageModal";

export default function WriteModalPage() {
  return (
    <NewPageModal>
      <StudyWritePage />
    </NewPageModal>
  );
}
