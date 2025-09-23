import { apiClient } from "@/lib/clientIntercept";

export async function approveAdminStudyParticipant(
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

export async function rejectAdminStudyParticipant(
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
