import { apiClient } from "@/lib/clientIntercept";

// 프로젝트 참가자 승인
export async function approveAdminProjectParticipant(
  participantId: number,
  reason = ""
) {
  try {
    const res = await apiClient.post(
      `/admin/study/participant/approve`,
      { participantId, reason },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 프로젝트 참가자 거절
export async function rejectAdminProjectParticipant(
  participantId: number,
  reason = ""
) {
  try {
    const res = await apiClient.post(
      `/admin/study/participant/reject`,
      { participantId, reason },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
