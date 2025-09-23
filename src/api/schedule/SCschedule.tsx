import { fetchWithAuth } from "@/lib/serverIntercept";
import { ScheduleInfo } from "@/types/schedule";
import { toOffset } from "@/utils/transformRequestValue";

// 스케줄 조회
export async function getSchedules(date: string): Promise<ScheduleInfo[]> {
  const params = new URLSearchParams();
  if (date) params.append("date", toOffset(date));

  const res = await fetchWithAuth(`/schedule/requests?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`스케줄 조회 실패: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

// 내 예약 조회
export async function getMySchedules(): Promise<ScheduleInfo[]> {
  const res = await fetchWithAuth("/schedule/me/request", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`스케줄 조회 실패: ${res.status} ${msg}`);
  }

  const json = await res.json();
  return json.data as ScheduleInfo[];
}
