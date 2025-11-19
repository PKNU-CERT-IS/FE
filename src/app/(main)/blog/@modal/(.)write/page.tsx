import BlogWritePage from "@/app/(main)/blog/write/page";
import NewPageModal from "@/components/write/CCNewPageModal";

export default function WriteModalPage() {
  return (
    <NewPageModal>
      <BlogWritePage />
    </NewPageModal>
  );
}
