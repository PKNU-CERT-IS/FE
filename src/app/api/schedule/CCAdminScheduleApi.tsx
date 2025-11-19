import {
  AdminScheduleCreateRequest,
  AdminScheduleInfo,
} from "@/types/schedule";
import { apiClient } from "@/lib/clientIntercept";

// 스케줄 호출
export async function getCCAdminSchedules() {
  try {
    const res = await apiClient.get(`/admin/schedule/requests`);
    return res.data.data as AdminScheduleInfo[];
  } catch (error) {
    throw error;
  }
}

// 스케줄 생성
export async function createAdminSchedule(body: AdminScheduleCreateRequest) {
  try {
    const res = await apiClient.post(`/admin/schedule/create`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

//  스케줄 삭제
export async function deleteAdminSchedule(scheduleId: number) {
  try {
    const res = await apiClient.delete(`/admin/schedule/delete`, {
      data: { scheduleId },
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
