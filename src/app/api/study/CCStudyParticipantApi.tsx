import { apiClient } from "@/lib/clientIntercept";

// 참가 신청
export async function joinStudyRegister(studyId: number) {
  try {
    const res = await apiClient.post(
      `/study/participant/join/register`,
      { studyId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelStudyRegister(studyId: number) {
  try {
    const res = await apiClient.delete(`/study/participant/join/cancel`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { studyId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

/* 스터디 생성자만 조작 가능 */
// 참가 신청 승인
export async function approveStudyParticipant(participantId: number) {
  try {
    const res = await apiClient.post(
      `/study/participant/join/approve`,
      { participantId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function rejectStudyParticipant(participantId: number) {
  try {
    const res = await apiClient.post(
      `/study/participant/join/reject`,
      { participantId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
