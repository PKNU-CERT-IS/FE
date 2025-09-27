import { apiClient } from "@/lib/clientIntercept";
import { CreateProjectMeeting, UpdateMeeting } from "@/types/meeting";

// 회의록 디테일 페이지 조회 -> 수정 위해서 필요
export async function getProjectDetailMeeting(meetingId: number) {
  try {
    const res = await apiClient.get(`/project/meeting/detail`, {
      params: { meetingId },
      headers: { "Content-Type": "application/json" },
    });

    console.log("회의록 디테일", res.data.data);
    return res.data.data;
  } catch (error) {
    throw error;
  }
}

// 생성
export async function createProjectMeeting(body: CreateProjectMeeting) {
  try {
    const res = await apiClient.post("/project/meeting/create", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 수정
export async function updateProjectMeeting(body: UpdateMeeting) {
  try {
    const res = await apiClient.put("/project/meeting/edit", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 스터디 회의록 삭제
export async function deleteProjectMeeting(meetingId: number) {
  try {
    const res = await apiClient.delete(`/project/meeting/delete`, {
      data: { meetingId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
