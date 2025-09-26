"server-only";

import { getProjectAllMeetings } from "@/app/api/SCMeetingApi";
import CCMeetingMinutes from "@/components/study/CCMeetingMinutes";

export default async function SCProjectMeetingMinutes({
  projectId,
  currentUserId,
  projectLeaderId,
}: {
  projectId: number;
  currentUserId: number;
  projectLeaderId: number;
}) {
  const projectMeetingData = await getProjectAllMeetings(projectId);

  return (
    <CCMeetingMinutes
      dataId={projectId}
      currentUserId={currentUserId}
      leaderId={projectLeaderId}
      initialData={projectMeetingData}
    />
  );
}
