import { apiClient } from "@/lib/clientIntercept";

// 스터디 참가자 승인
export async function approveAdminStudyParticipant(
  memberId: number,
  studyId: number,
  reason = "",
) {
  try {
    const res = await apiClient.post(
      `/admin/study/participant/approve`,
      { memberId, studyId, reason },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 스터디 참가자 거절
export async function rejectAdminStudyParticipant(
  memberId: number,
  studyId: number,
  reason = "",
) {
  try {
    const res = await apiClient.post(
      `/admin/study/participant/reject`,
      { memberId, studyId, reason },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
