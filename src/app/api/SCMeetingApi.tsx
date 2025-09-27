import { fetchWithAuth } from "@/lib/serverIntercept";

// 스터디 회의록 전체 조회
export async function getStudyAllMeetings(
  studyId: number,
  page = 0,
  size = 10
) {
  const params = new URLSearchParams();
  params.append("studyId", studyId.toString());
  params.append("page", page.toString());
  params.append("size", size.toString());
  params.append("sort", "createdAt,desc");

  const res = await fetchWithAuth(`/study/meeting/all?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`회의록 전체 조회 실패: ${res.status}`);
  }

  const json = await res.json();
  console.log(json, "스터디 회의록");
  return json.data.content;
}

export async function getStudyDetailMeeting(meetingId: number) {
  const params = new URLSearchParams();
  params.append("meetingId", meetingId.toString());

  const res = await fetchWithAuth(
    `/study/meeting/detail?${params.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error(`회의록 전체 조회 실패: ${res.status}`);
  }

  const json = await res.json();
  console.log(json, "스터디 detail 회의록");
  return json.data.content;
}

// 프로젝트 회의록 전체 조회
export async function getProjectAllMeetings(
  projectId: number,
  page = 0,
  size = 10
) {
  const params = new URLSearchParams();
  params.append("projectId", projectId.toString());
  params.append("page", page.toString());
  params.append("size", size.toString());
  params.append("sort", "id,desc");

  const res = await fetchWithAuth(`/project/meeting/all?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`프로젝트 회의록 전체 조회 실패: ${res.status}`);
  }

  const json = await res.json();
  console.log("프로젝트 회의록 조회", json);
  return json.data.content;
}
