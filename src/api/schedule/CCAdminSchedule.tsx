import { apiClient } from "@/lib/clientIntercept";
import {
  AdminScheduleCreateRequest,
  AdminScheduleInfo,
} from "@/types/schedule";

// 스케줄 호출
export async function getCCAdminSchedules() {
  try {
    const res = await apiClient.get(`/admin/schedule/requests`);
    return res.data.data as AdminScheduleInfo[];
  } catch (error: any) {
    console.error("어드민 스케줄 조회 실패:", error.response?.status || error);
    return [];
  }
}

// 스케줄 생성
export async function createAdminSchedule(body: AdminScheduleCreateRequest) {
  try {
    const res = await apiClient.post(`/admin/schedule/create`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.data;
  } catch (error: any) {
    console.error("어드민 스케줄 생성 실패:", error.response?.status || error);
    throw new Error(
      `스케줄 생성 실패: ${error.response?.status || "Unknown error"}`
    );
  }
}

//  스케줄 삭제
export async function deleteAdminSchedule(scheduleId: number) {
  try {
    const res = await apiClient.delete(`/admin/schedule/delete`, {
      data: { scheduleId }, // axios delete는 body 대신 data 사용
      headers: { "Content-Type": "application/json" },
    });
    console.log("삭제 성공:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("어드민 스케줄 삭제 실패:", error.response?.status || error);
    throw new Error(
      `스케줄 삭제 실패: ${error.response?.status || "Unknown error"}`
    );
  }
}
