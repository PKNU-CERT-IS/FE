import { apiClient } from "@/lib/clientIntercept";
import { ScheduleCreateRequest } from "@/types/schedule";

// 생성
export async function createSchedule(body: ScheduleCreateRequest) {
  try {
    const res = await apiClient.post(`/schedule/request`, body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data.data;
  } catch (error: any) {
    console.error("스케줄 생성 실패:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers,
    });
    throw new Error(
      `스케줄 생성 실패: ${error.response?.status || "Unknown error"}`
    );
  }
}

// 스케줄 삭제
export async function deleteSchedule(scheduleId: number) {
  try {
    const res = await apiClient.delete(`/schedule/request/delete`, {
      data: { scheduleId },
      headers: { "Content-Type": "application/json" },
    });

    console.log("삭제 성공:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("스케줄 삭제 실패:", error.response?.status || error);
    throw new Error(
      `스케줄 삭제 실패: ${error.response?.status || "Unknown error"}`
    );
  }
}
