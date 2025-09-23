import { fetchWithAuth } from "@/lib/serverIntercept";

export async function getStudyAllParticipants(
  studyId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["createdAt,desc"]
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    sort.forEach((s) => params.append("sort", s));

    const res = await fetchWithAuth(
      `/study/participant/${studyId}/participants/all?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`스터디 참가자 전체 조회 실패: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 승인된 참가자 조회
export async function getApprovedParticipants(
  studyId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["createdAt,desc"]
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
export async function getPendingParticipants(
  studyId: number,
  page: number = 0,
  size: number = 10,
  sort: string[] = ["createdAt,desc"]
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
      }
    );

    if (!res.ok) {
      throw new Error(`대기중 참가자 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log("대기중", json);
    return json.data;
  } catch (error) {
    throw error;
  }
}
