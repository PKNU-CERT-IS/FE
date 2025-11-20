import ProjectWritePage from "@/app/(main)/project/write/page";
import NewPageModal from "@/components/write/CCNewPageModal";

export default function WriteModalPage() {
  return (
    <NewPageModal>
      <ProjectWritePage />
    </NewPageModal>
  );
}
