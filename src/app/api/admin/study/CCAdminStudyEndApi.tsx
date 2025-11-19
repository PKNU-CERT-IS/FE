import { apiClient } from "@/lib/clientIntercept";

// 스터디 종료 승인
export async function approveAdminStudyEnd(studyId: number) {
  try {
    const res = await apiClient.post(
      `/admin/study/end/approve`,
      { studyId },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
// 스터디 종료 거절
export async function rejectAdminStudyEnd(studyId: number) {
  try {
    const res = await apiClient.post(
      `/admin/study/end/reject`,
      { studyId },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
