"server-only";

import StudyDetailPage from "@/app/(admin)/admin/study/[id]/studyDetailPage";
import ProjectDetailPage from "@/app/(admin)/admin/study/[id]/projectDetailPage";

interface AdminStudyDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function AdminStudyDetailPage({
  params,
  searchParams,
}: AdminStudyDetailPageProps) {
  const { id } = await params;
  const { tab } = await searchParams;

  if (tab === "project") {
    return <ProjectDetailPage params={{ id }} />;
  }
  if (tab === "study") {
    return <StudyDetailPage params={{ id }} />;
  }
}
