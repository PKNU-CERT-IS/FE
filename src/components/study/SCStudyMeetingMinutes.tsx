"server-only";

import { getStudyAllMeetings } from "@/app/api/SCMeetingApi";
import CCMeetingMinutes from "@/components/study/CCMeetingMinutes";

export default async function SCStudyMeetingMinutes({
  studyId,
  currentUserId,
  studyLeaderId,
}: {
  studyId: number;
  currentUserId: number;
  studyLeaderId: number;
}) {
  const studyMeetingData = await getStudyAllMeetings(studyId);

  return (
    <CCMeetingMinutes
      dataId={studyId}
      currentUserId={currentUserId}
      leaderId={studyLeaderId}
      initialData={studyMeetingData}
    />
  );
}
