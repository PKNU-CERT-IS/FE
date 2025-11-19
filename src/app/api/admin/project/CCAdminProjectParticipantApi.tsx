import { apiClient } from "@/lib/clientIntercept";

// 프로젝트 참가자 승인
export async function approveAdminProjectParticipant(
  memberId: number,
  projectId: number,
  reason = "",
) {
  try {
    const res = await apiClient.post(
      `/admin/project/participant/approve`,
      { memberId, projectId, reason },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 프로젝트 참가자 거절
export async function rejectAdminProjectParticipant(
  memberId: number,
  projectId: number,
  reason = "",
) {
  try {
    const res = await apiClient.post(
      `/admin/project/participant/reject`,
      { memberId, projectId, reason },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
