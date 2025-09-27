import { AdminScheduleInfo } from "@/types/schedule";
import { fetchWithAuth } from "@/lib/serverIntercept";

export async function getAdminSchedules() {
  try {
    const res = await fetchWithAuth(`/admin/schedule/requests`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`으두민스케줄 조회 실패: ${res.status}`);
    }

    const json: { data: AdminScheduleInfo[] } = await res.json();

    return json.data;
  } catch (error) {
    console.error("getAdminSchedules error:", error);
    return [];
  }
}

export async function getPendingSchedules() {
  try {
    const res = await fetchWithAuth(`/admin/schedule/requests`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`스케줄 조회 실패: ${res.status}`);
    }

    const json: { data: AdminScheduleInfo[] } = await res.json();

    return json.data.filter((schedule) => schedule.status === "PENDING");
  } catch (error) {
    console.error("getAdminSchedules error:", error);
    return [];
  }
}

// 스케줄 상태 변경 (승인/거절)
export async function updateAdminScheduleStatus(
  scheduleId: number,
  status: "APPROVED" | "REJECTED"
) {
  try {
    const res = await fetchWithAuth(`/admin/schedule/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleId, status }),
    });

    if (!res.ok) {
      throw new Error(`스케줄 상태 변경 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("updateAdminScheduleStatus error:", error);
    throw error;
  }
}
