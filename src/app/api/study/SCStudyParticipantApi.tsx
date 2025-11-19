import { fetchWithAuth } from "@/lib/serverIntercept";

// 승인된 참가자 조회
export async function getStudyApprovedParticipants(
  studyId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["createdAt,desc"],
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    sort.forEach((s) => params.append("sort", s));

    const res = await fetchWithAuth(
      `/study/participant/${studyId}/participants/approved?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error(`승인된 참가자 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 대기중 참가자 조회
export async function getStudyPendingParticipants(
  studyId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["createdAt,desc"],
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    sort.forEach((s) => params.append("sort", s));

    const res = await fetchWithAuth(
      `/study/participant/${studyId}/participants/pending?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error(`대기중 참가자 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}
