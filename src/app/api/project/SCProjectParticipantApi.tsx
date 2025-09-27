import { fetchWithAuth } from "@/lib/serverIntercept";

// 승인된 참가자 조회
export async function getProjectApprovedParticipants(
  projectId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["id,desc"]
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    sort.forEach((s) => params.append("sort", s));

    const res = await fetchWithAuth(
      `/project/participant/${projectId}/participants/approved?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`승인된 참가자 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log(json);
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 대기중 참가자 조회
export async function getProjectPendingParticipants(
  projectId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["id,desc"]
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    sort.forEach((s) => params.append("sort", s));

    const res = await fetchWithAuth(
      `/project/participant/${projectId}/participants/pending?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`project대기중 참가자 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("대기중 참가자 조회 에러", error);
    throw error;
  }
}
