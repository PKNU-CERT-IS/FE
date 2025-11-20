import { ScheduleCreateRequest, ScheduleInfo } from "@/types/schedule";
import { apiClient } from "@/lib/clientIntercept";

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
// 스케줄 조회 (miniCalendar 용)
export async function getSchedules(date?: string): Promise<ScheduleInfo[]> {
  try {
    const res = await apiClient.get(`/schedule/requests`, {
      params: { date },
      headers: { "Content-Type": "application/json" },
    });

    return res.data.data;
  } catch (error) {
    throw error;
  }
}
