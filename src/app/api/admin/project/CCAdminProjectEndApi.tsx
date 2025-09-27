import { apiClient } from "@/lib/clientIntercept";

// 프로젝트 종료 승인
export async function approveAdminProjectEnd(projectId: number) {
  try {
    const res = await apiClient.post(
      `/admin/project/end/approve`,
      { projectId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
// 프로젝트 종료 거절
export async function rejectAdminProjectEnd(projectId: number) {
  try {
    const res = await apiClient.post(
      `/admin/project/end/reject`,
      { projectId },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
