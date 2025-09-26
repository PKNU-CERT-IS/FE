import { apiClient } from "@/lib/clientIntercept";

// 스터디 생성 승인
export async function approveAdminStudyCreate(studyId: number) {
  try {
    const res = await apiClient.post(
      `/admin/study/create/approve`,
      { studyId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
// 스터디 생성 거절
export async function rejectAdminStudyCreate(studyId: number) {
  try {
    const res = await apiClient.post(
      `/admin/study/create/reject`,
      { studyId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
