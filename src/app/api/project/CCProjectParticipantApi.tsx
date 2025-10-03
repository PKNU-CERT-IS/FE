import { apiClient } from "@/lib/clientIntercept";

// 참가 신청
export async function joinProjectRegister(projectId: number) {
  try {
    const res = await apiClient.post(
      `/project/participant/join/register`,
      { projectId },
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

export async function cancelProjectRegister(projectId: number) {
  try {
    const res = await apiClient.delete(`/project/participant/join/cancel`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { projectId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

/* 스터디 생성자만 조작 가능 */
// 참가 신청 승인
export async function approveProjectParticipant(
  memberId: number,
  projectId: number
) {
  try {
    const res = await apiClient.post(
      `/project/participant/join/approve`,
      { memberId, projectId },
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
export async function rejectProjectParticipant(
  memberId: number,
  projectId: number
) {
  try {
    const res = await apiClient.post(
      `/project/participant/join/reject`,
      { memberId, projectId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
