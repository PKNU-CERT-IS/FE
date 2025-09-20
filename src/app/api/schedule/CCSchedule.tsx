import { apiClient } from "@/lib/clientIntercept";
import { ScheduleCreateRequest } from "@/types/schedule";

//  스케줄 생성
export async function createSchedule(body: ScheduleCreateRequest) {
  try {
    const res = await apiClient.post(`/schedule/request`, body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
}

// 스케줄 삭제
export async function deleteSchedule(scheduleId: number) {
  try {
    const res = await apiClient.delete(`/schedule/request/delete`, {
      data: { scheduleId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
