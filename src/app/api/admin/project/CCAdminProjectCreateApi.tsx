// 프로젝트 생성 승인
import { apiClient } from "@/lib/clientIntercept";

export async function approveAdminProjectCreate(projectId: number) {
  try {
    const res = await apiClient.post(
      `/admin/project/create/approve`,
      { projectId },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
// 프로젝트 생성 거절
export async function rejectAdminProjectCreate(projectId: number) {
  try {
    const res = await apiClient.post(
      `/admin/project/create/reject`,
      { projectId },
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
