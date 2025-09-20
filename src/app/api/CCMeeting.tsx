import { apiClient } from "@/lib/clientIntercept";
import { CreateMeeting, UpdateMeeting } from "@/types/meeting";

// 회의록 디테일 페이지 조회 -> 수정 위해서 필요
export async function getStudyDetailMeeting(meetingId: number) {
  try {
    const res = await apiClient.get(`/study/meeting/detail`, {
      params: { meetingId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// 생성
export async function createStudyMeeting(body: CreateMeeting) {
  try {
    const res = await apiClient.post("/study/meeting/create", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 수정
export async function updateStudyMeeting(body: UpdateMeeting) {
  try {
    const res = await apiClient.post("/study/meeting/update", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 스터디 회의록 삭제
export async function deleteStudyMeeting(meetingId: number) {
  try {
    const res = await apiClient.delete(`/study/meeting/delete`, {
      data: { meetingId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
