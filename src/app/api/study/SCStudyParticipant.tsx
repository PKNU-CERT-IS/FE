import { fetchWithAuth } from "@/lib/serverIntercept";

export async function getStudyAllParticipants(
  studyId: number,
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
    console.log("스터디 참가자 전체 조회", json);
    return json.data; // 페이징 포함된 content 반환
  } catch (error) {
    console.error("참가자 조회 에러", error);
    throw error;
  }
}
